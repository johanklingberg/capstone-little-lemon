import AsyncStorage from '@react-native-async-storage/async-storage';

export const isOnboardingCompleted = async () => {
  const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
    
  console.log("onboarding completed: " + onboardingCompleted);
  return onboardingCompleted === 'true';
};

export const setUserInfo = async (firstName, email) => {
  try {
    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('onboardingCompleted', 'true');

    console.log(`Stored firstName: ${firstName}`);
    console.log(`Stored email: ${email}`);
    console.log('Onboarding completed status set to true');
  } catch (error) {
    console.error(error);
  }
};

export const getProfileInfo = async () => {
  try {
    const image = await AsyncStorage.getItem('image') || '';
    const firstName = await AsyncStorage.getItem('firstName') || '';
    const lastName = await AsyncStorage.getItem('lastName') || '';
    const email = await AsyncStorage.getItem('email') || '';
    const phoneNumber = await AsyncStorage.getItem('phoneNumber') || '';
    const notifyOrderStatus = await AsyncStorage.getItem('notifyOrderStatus') === 'true';
    const notifyPasswordChanges = await AsyncStorage.getItem('notifyPasswordChanges') === 'true';
    const notifySpecialOffers = await AsyncStorage.getItem('notifySpecialOffers') === 'true';
    const notifyNewsletter = await AsyncStorage.getItem('notifyNewsletter') === 'true';

    console.log(`Retrieved image: ${image}`);
    console.log(`Retrieved firstName: ${firstName}`);
    console.log(`Retrieved lastName: ${lastName}`);
    console.log(`Retrieved email: ${email}`);
    console.log(`Retrieved phoneNumber: ${phoneNumber}`);
    console.log(`Retrieved notifyOrderStatus: ${notifyOrderStatus}`);
    console.log(`Retrieved notifyPasswordChanges: ${notifyPasswordChanges}`);
    console.log(`Retrieved notifySpecialOffers: ${notifySpecialOffers}`);
    console.log(`Retrieved notifyNewsletter: ${notifyNewsletter}`);

    return { image, firstName, lastName, email, phoneNumber, notifyOrderStatus, notifyPasswordChanges, notifySpecialOffers, notifyNewsletter };
  } catch (error) {
    console.error(error);
    return { image: '', firstName: '', lastName: '', email: '', phoneNumber: '', notifyOrderStatus: false, notifyPasswordChanges: false, notifySpecialOffers: false, notifyNewsletter: false };
  }
};

export const saveProfileChanges = async (image, firstName, lastName, email, phoneNumber, notifyOrderStatus, notifyPasswordChanges, notifySpecialOffers, notifyNewsletter) => {
  try {
    await AsyncStorage.setItem('image', image);
    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('lastName', lastName);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('phoneNumber', phoneNumber);
    await AsyncStorage.setItem('notifyOrderStatus', notifyOrderStatus ? 'true' : 'false');
    await AsyncStorage.setItem('notifyPasswordChanges', notifyPasswordChanges ? 'true' : 'false');
    await AsyncStorage.setItem('notifySpecialOffers', notifySpecialOffers ? 'true' : 'false');
    await AsyncStorage.setItem('notifyNewsletter', notifyNewsletter ? 'true' : 'false');

    console.log(`Stored image: ${image}`);
    console.log(`Stored firstName: ${firstName}`);
    console.log(`Stored lastName: ${lastName}`);
    console.log(`Stored email: ${email}`);
    console.log(`Stored phoneNumber: ${phoneNumber}`);
    console.log(`Stored notifyOrderStatus: ${notifyOrderStatus}`);
    console.log(`Stored notifyPasswordChanges: ${notifyPasswordChanges}`);
    console.log(`Stored notifySpecialOffers: ${notifySpecialOffers}`);
    console.log(`Stored notifyNewsletter: ${notifyNewsletter}`);
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('image');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('lastName');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('phoneNumber');
    await AsyncStorage.removeItem('notifyOrderStatus');
    await AsyncStorage.removeItem('notifyPasswordChanges');
    await AsyncStorage.removeItem('notifySpecialOffers');
    await AsyncStorage.removeItem('notifyNewsletter');
    console.log('Logged out');
  } catch (error) {
    console.error(error);
  }
};

