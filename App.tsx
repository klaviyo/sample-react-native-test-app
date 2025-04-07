/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import messaging from '@react-native-firebase/messaging';
import {
    Button, Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
  Klaviyo,
  Location,
  Profile,
  ProfileProperty,
} from 'klaviyo-react-native-sdk';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const safePadding = '10%';

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingBottom: safePadding,
            paddingTop: safePadding,
          }}>
          <Section title="Sample RN Project">
              {'Basic functionality to test Klaviyo SDK with badge count. \n\n' +
                  'Note: You must initialize the SDK on every new app session. \n\n' +
                  "Replace 'YOUR_COMPANY_API_KEY' with your company id in App.tsx"}
          </Section>

            <Section title="Sample RN Project">
                <Button
                    title="Initialize"
                    onPress={() => {
                        Klaviyo.initialize('XNhKEQ');
                    }}
                />
                <Button
                    title="Create a random profile"
                    onPress={() => {
                        setProfile().then();
                    }}
                />
                <Button
                    title="Request permission & get push token"
                    onPress={() =>
                        requestUserPermission().then(() => {
                            fetchAndSetPushToken().then();
                        })
                    }
                />
                <Button
                    title="Set badge count to some number"
                    onPress={() => {
                        const getRandomDigit = () => Math.floor(Math.random() * 10);
                        const randomDigit = getRandomDigit();
                        console.log('Setting badge count to a random digit:', randomDigit);
                        Klaviyo.setBadgeCount(randomDigit);
                    }}
                />
                <Button
                    title="Reset badge count to 0"
                    onPress={() => {
                        Klaviyo.setBadgeCount(0);
                    }}
                />
            </Section>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

export const setProfile = async () => {
    try {
        const myLocation: Location = {
            address1: generateRandomAddress().street,
            address2: 'apt 123',
            city: generateRandomAddress().city,
            country: 'USA',
            latitude: 99,
            longitude: 99,
            region: generateRandomAddress().city,
            zip: generateRandomAddress().zipCode,
            timezone: 'EST',
        };

        const myProperties: Record<ProfileProperty, any> = {
            [ProfileProperty.FIRST_NAME]: generateRandomName(5),
            [ProfileProperty.LAST_NAME]: generateRandomName(5),
            [ProfileProperty.ADDRESS1]: generateRandomAddress().street,
            [ProfileProperty.ADDRESS2]: 'Apt 456',
            [ProfileProperty.TITLE]: 'Mr.',
            [ProfileProperty.ORGANIZATION]: 'ABC Inc.',
            [ProfileProperty.CITY]: 'Cityville',
            [ProfileProperty.REGION]: 'Regionville',
            [ProfileProperty.COUNTRY]: 'Countryland',
            [ProfileProperty.ZIP]: '12345',
            [ProfileProperty.IMAGE]: 'profile.jpg',
            [ProfileProperty.LATITUDE]: 40.7128,
            [ProfileProperty.LONGITUDE]: -74.006,
        };

        const myProfile: Profile = {
            email: generateRandomEmails(),
            phoneNumber: generateRandomPhoneNumber(),
            externalId: generateRandomName(8),
            firstName: generateRandomName(7),
            lastName: generateRandomName(4),
            organization: generateRandomName(5),
            title: generateRandomName(6),
            image: generateRandomName(5),
            location: myLocation,
            properties: myProperties,
        };
        console.log('Creating profile:', myProfile)
        Klaviyo.setProfile(myProfile);
    } catch (e: any) {
        console.log(e.message, e.code);
    }
};

export const generateRandomName = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomName = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomName += characters.charAt(randomIndex);
    }

    return randomName;
};

export const generateRandomPhoneNumber = () => {
    const getRandomDigit = () => Math.floor(Math.random() * 10);
    const lineNumber = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;

    return `+1${234}${567}${lineNumber}`;
};

export const generateRandomAddress = () => {
    const streets = ['Main St', 'Elm St', 'Oak Ave', 'Cedar Ln', 'Maple Rd'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];
    const states = ['CA', 'NY', 'TX', 'FL', 'IL'];
    const zipCodes = ['10001', '90001', '60601', '77001', '33101'];

    const randomStreet = streets[Math.floor(Math.random() * streets.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomState = states[Math.floor(Math.random() * states.length)];
    const randomZipCode = zipCodes[Math.floor(Math.random() * zipCodes.length)];

    return {
        street: randomStreet,
        city: randomCity,
        state: randomState,
        zipCode: randomZipCode,
    };
};

export const generateRandomEmails = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for (let ii = 0; ii < 15; ii++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    return string + '@gmail.com';
};

export const requestUserPermission = async () => {
    let isAuthorized = false;

    if (Platform.OS === 'ios') {
        const iOsAuthStatus = await messaging().requestPermission();
        isAuthorized =
            iOsAuthStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            iOsAuthStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }

    if (isAuthorized) {
        console.log('User has notification permissions enabled.');
    } else {
        console.log('User has notification permissions disabled');
    }
};

export const fetchAndSetPushToken = async () => {
    try {
        let deviceToken: string | null = null;
        if (Platform.OS === 'android') {
            deviceToken = await messaging().getToken();
            console.log('FCM Token:', deviceToken);
        } else {
            deviceToken = await messaging().getAPNSToken();
            console.log('APNs Token:', deviceToken);
        }

        if (deviceToken != null && deviceToken.length > 0) {
            Klaviyo.setPushToken(deviceToken!);
        }
    } catch (error) {
        console.error('Error in fetchAndSetPushToken:', error);
    }
};