import React, { useEffect } from 'react'
import { View, Text, DeviceEventEmitter } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import ReactNativeForegroundService from '@supersami/rn-foreground-service'

export default function PushNotification({ navigation }) {

  useEffect(() => {
    getToken()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("remote message",remoteMessage);
      let subscipt = DeviceEventEmitter.addListener(
        'notificationHandle',
        function (e) {
          console.log('json', e)
          alert('json', e)
        }
      );
      return function cleanup() {
        subscipt.remove()
      }
      // navigation.navigate('IncomingCall')
      // ReactNativeForegroundService.add_task(
      //   () => console.log('I am Being Tested'),
      //   {
      //     delay: 100,
      //     onLoop: true,
      //     taskId: 'taskid',
      //     onError: (e) => console.log(`Error logging:`, e),
      //   },
      // )
      // ReactNativeForegroundService.start({
      //   id: 144,
      //   title: 'Incoming call',
      //   message: 'you have a call!',
      // });
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    const subscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
      let subscipt = DeviceEventEmitter.addListener(
        'notificationHandle',
        function (e) {
          console.log('json', e)
          alert('json', e)
        }
      );
      return function cleanup() {
        subscipt.remove()
      }
      // ReactNativeForegroundService.start({
      //   id: 144,
      //   title: remoteMessage.notification.title,
      //   message: remoteMessage.notification.body,
      // });
    });
    return subscribe
  }, [])

  const getToken = async () => {
    let token = await messaging().getToken()
    console.log("fcmTOken", token);
  }
  return (
    <View />
  )
}
