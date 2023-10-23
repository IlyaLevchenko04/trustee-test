import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { accessToken, expiresIn } from '../constants';

export const GoogleCalendar = ({ setEvents, setIsSignedIn, isSignedIn }) => {
  let tokenClient;
  const [gisIsLoaded, setGisIsLoaded] = useState(false);

  const gapi = window.gapi;
  const google = window.google;

  const {
    REACT_APP_GOOGLE_API_KEY,
    REACT_APP_GOOGLE_CLIENT_ID,
    REACT_APP_GOOGLE_CLIENT_SECRET,
  } = process.env;

  const CLIENT_ID = REACT_APP_GOOGLE_CLIENT_ID;
  const API_KEY = REACT_APP_GOOGLE_API_KEY;
  const DISCOVERY_DOC =
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

  console.log(gisIsLoaded);

  useEffect(() => {
    if (!gisIsLoaded) {
      console.log('1');
      gapiLoaded();
      gisLoaded();
    }
  }, [gapiLoaded, gisLoaded, gisIsLoaded]);

  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });

    console.log(accessToken, expiresIn);

    if (accessToken && expiresIn) {
      gapi.client.setToken({
        access_token: accessToken,
        expires_in: expiresIn,
      });
      listUpcomingEvents();
      setGisIsLoaded(true);
    }
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '',
    });
  }

  function handleAuthClick() {
    // if (!tokenClient) {
    //   sendToast('Google API error');

    // }

    if (tokenClient) {
      console.log(tokenClient);
      tokenClient.callback = async resp => {
        if (resp.error) {
          throw resp;
        }
        await listUpcomingEvents();
        const { access_token, expires_in } = gapi.client.getToken();
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('expires_in', expires_in);
      };
      setIsSignedIn(true);
      if (!(accessToken && expiresIn)) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        tokenClient.requestAccessToken({ prompt: '' });
      }
    }
  }

  function handleSignoutClick() {
    const token = gapi.client.getToken();
    console.log(token);
    if (token) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      localStorage.clear();
      setEvents([]);
      setIsSignedIn(false);
      return;
    }

    return;
  }

  async function listUpcomingEvents() {
    let response;
    try {
      const request = {
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      };
      response = await gapi.client.calendar.events.list(request);
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }

    const events = response.result.items;
    if (!events || events.length === 0) {
      document.getElementById('content').innerText = 'No events found.';
      return;
    }

    const newEvents = events.map(({ end, start, summary }) => {
      return {
        timeStart: new Date(start.dateTime),
        timeEnd: new Date(end.dateTime),
        title: summary,
        id: nanoid(),
      };
    });

    console.log(newEvents);

    setEvents(newEvents);
  }

  return (
    <div>
      {!isSignedIn && (
        <button
          id="authorize_button"
          onClick={handleAuthClick}
          className="google-authorize"
        >
          Authorize with Google
        </button>
      )}
      {isSignedIn && (
        <button
          className="google-signOut"
          id="signout_button"
          onClick={handleSignoutClick}
        >
          Sign Out
        </button>
      )}
      <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre>
    </div>
  );
};
