import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  View,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

import requestCameraAndAudioPermission from './components/Permission';
import styles from './components/Style';


export default class Video extends Component {
  _engine;

  constructor(props) {
    super(props);
    this.state = {
      appId: '97f6b3913d914852991201ab7c752929',
      token: '00697f6b3913d914852991201ab7c752929IAD+0u+ij+tdW4V2Y91uLA4rBdw9eUudm9vpYzTXYvKYHgJkFYoAAAAAEAC5X9YGzO5WYAEAAQDM7lZg',
      channelName: 'channel-x',
      openMicrophone: true,
      enableSpeakerphone: true,
      joinSucceed: false,
      peerIds: [],
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const { appId } = this.state
    this._engine = await RtcEngine.create(appId)
    // Enable the audio module.
    await this._engine.enableAudio()


    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed)
      const { peerIds } = this.state
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          peerIds: [...peerIds, uid]
        })
      }
    })

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason)
      const { peerIds } = this.state
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid)
      })
    })

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed)
      this.setState({
        joinSucceed: true
      })
    })
  }

  // Pass in your token and channel name through this.state.token and this.state.channelName.
// Set the ID of the local user, which is an integer and should be unique. If you set uid as 0,
// the SDK assigns a user ID for the local user and returns it in the JoinChannelSuccess callback.
_joinChannel = async () => {
  await this._engine?.joinChannel(this.state.token, this.state.channelName, null, 0)
}

// Turn the microphone on or off.
_switchMicrophone = () => {
  const { openMicrophone } = this.state
  this._engine?.enableLocalAudio(!openMicrophone).then(() => {
      this.setState({ openMicrophone: !openMicrophone })
    }).catch((err) => {
      console.warn('enableLocalAudio', err)
    })
}

// Switch the audio playback device.
_switchSpeakerphone = () => {
  const { enableSpeakerphone } = this.state
  this._engine?.setEnableSpeakerphone(!enableSpeakerphone).then(() => {
      this.setState({ enableSpeakerphone: !enableSpeakerphone })
    }).catch((err) => {
      console.warn('setEnableSpeakerphone', err)
    })
}
_leaveChannel = async () => {
  await this._engine?.leaveChannel()
  this.setState({peerIds: [], joinSucceed: false})
}

      render() {
        const {
            channelName,
            joinSucceed,
            openMicrophone,
            enableSpeakerphone,
          } = this.state;
        return (
            <View style={styles.container}>
              <View style={styles.top}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.setState({ channelName: text })}
                  placeholder={'Channel Name'}
                  value={channelName}
                />
                <Button
                  onPress={joinSucceed ? this._leaveChannel : this._joinChannel}
                  title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
                />
              </View>
              <View style={styles.float}>
                <Button
                  onPress={this._switchMicrophone}
                  title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
                />
                <Button
                  onPress={this._switchSpeakerphone}
                  title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
                />
              </View>
            </View>
        )
  }
}
