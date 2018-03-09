<!DOCTYPE html>
<html>
<head>
  <title>Spotify Web Playback SDK Quick Start Tutorial</title>
</head>
<body>
  <h1>Spotify Web Playback SDK Quick Start Tutorial</h1>
  <h2>Open your console log: <code>View > Developer > JavaScript Console</code></h2>

  <script src="https://sdk.scdn.co/spotify-player.js"></script>
  <script>
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = 'BQBFIotr6y63JPfjrOyp24FAdKaq0UwSjvVS3TBmnGPTCUaFVNnhOw4VHK3OJpDSXSp_Ja-V1y2XKMRh8PJOAENtb-wWnyy13jAkUUF7ixaTJ7P0NKQoPQdvO2gOi1WSfw9g4tgdzUgBWwlfk-jvNvoSTk_c_DZd2cf5h9OWNA';
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', state => { console.log(state); });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Connect to the player!
      player.connect();
    };
  </script>
</body>
</html>
