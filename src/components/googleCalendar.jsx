import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';

export const GoogleCalendar = ({ setEvents, setIsSignedIn, isSignedIn }) => {
  const accessToken = localStorage.getItem('access_token' || '');
  const expiresIn = localStorage.getItem('expires_in' || '');

  if (isSignedIn) {
    console.log(isSignedIn);
  }

  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID =
    '438594569831-vof1b2fjmu01vnp37senhuqf2eh1s4id.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyBffN1XPuX-mNFUtYsV01WhI1_ZsJc_xpo';
  const DISCOVERY_DOC =
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

  let gapiInited = false,
    gisInited = false,
    tokenClient;

  useEffect(() => {
    //const expiryTime = new Date().getTime() + expiresIn * 1000;
    gapiLoaded();
    gisLoaded();
  }, []);

  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;

    if (accessToken && expiresIn) {
      gapi.client.setToken({
        access_token: accessToken,
        expires_in: expiresIn,
      });
      listUpcomingEvents();
    }
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '',
    });

    gisInited = true;
  }

  function handleAuthClick() {
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
          Authorize
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
