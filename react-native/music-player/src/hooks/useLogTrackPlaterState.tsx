import {Event, useTrackPlayerEvents} from 'react-native-track-player';

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
];

export function useLogTrackPlaterState() {
  useTrackPlayerEvents(events, async (event) => {
    if (event.type === Event.PlaybackError)
      console.warn('an error ocurred: ', event);

    if (event.type === Event.PlaybackState)
      console.log('playback state: ', event.state);

    if (event.type === Event.PlaybackActiveTrackChanged)
      console.error('Track changed: ', event.index);
  });
}
