import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}

async function getFcmToken() {

    let fcmtoken = await AsyncStorage.getItem('fcmtoken')

    if (!fcmtoken) {

        try {
            let fcmtoken = await messaging().getToken()
            console.log('oldtoken', fcmtoken);

            if (fcmtoken) {
                console.log('newtoken', fcmtoken);
                await AsyncStorage.setItem('fcmtoken', fcmtoken)

            } else {

            }

        } catch (error) {
            console.log(error, 'error in fcmToken');

        }
    }



}

const NotificationLister = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('notification caused to open from backgroundstate:', remoteMessage.notification,);
    })

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log('notification caused to open from quitstate:', remoteMessage.notification,);
            }

        })
}