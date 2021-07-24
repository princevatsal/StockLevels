import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Brand from '../components/atomic/brand';
import IntlPhoneInput from 'react-native-intl-phone-input';
import GradientButton from '../components/atomic/gradientButton';
import Tick from '../assets/tick2.png';
import auth from '@react-native-firebase/auth';

const PhoneLogin = ({navigation, setPhone}) => {
  const [isValid, setIsValid] = useState(false);
  const [number, setNumber] = useState('');
  const [prefix, setPrefix] = useState('');
  const [submit, setSubmit] = useState(false);
  const [validCode, setValidCode] = useState(false);
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [showResend, setShowResend] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const verifyNumber = () => {
    setLoading(true);
    try {
      confirm
        .confirm(code)
        .then(() => {})
        .catch(() => {
          setSubmitError('Wrong OTP');
          setLoading(false);
        });
    } catch (err) {
      setSubmitError('Invalid Code');
      setLoading(false);
    }
  };
  const loginWithPhoneNo = async () => {
    try {
      setSubmit(true);
      setValidCode(false);
      const confirmation = await auth().signInWithPhoneNumber(number);
      setConfirm(confirmation);
    } catch (err) {
      setSubmitError('Unable to send msg' + err);
    }
  };
  const onChangeText = ({
    dialCode,
    unmaskedPhoneNumber,
    phoneNumber,
    isVerified,
  }) => {
    isVerified ? setIsValid(true) : setIsValid(false);
    setNumber('' + dialCode + '' + unmaskedPhoneNumber);
    setPrefix(dialCode);
  };
  return (
    <View style={styles.container}>
      <Brand />
      {submit ? (
        <View style={styles.cover}>
          <Text style={{...styles.heading, textAlign: 'center', fontSize: 35}}>
            Verification
          </Text>
          <Text style={{...styles.para, textAlign: 'center'}}>
            Please enter your the code you received on your mobile phone
          </Text>

          <Text style={{...styles.para, textAlign: 'center'}}>{number}</Text>
          <TouchableOpacity
            onPress={() => {
              setSubmit(false);
              setIsValid(false);
            }}>
            <Text
              style={{
                color: '#27ae60',
                fontSize: 15,
                textAlign: 'center',
                width: '90%',
              }}>
              Change Number
            </Text>
          </TouchableOpacity>

          <TextInput
            keyboardType="numeric"
            style={styles.varcode}
            onChangeText={text => {
              setCode(text);
              text.length == 6 ? setValidCode(true) : setValidCode(false);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              validCode && verifyNumber();
            }}>
            {loading ? (
              <ActivityIndicator color="blue" />
            ) : (
              <GradientButton
                colors={
                  validCode ? ['#FF6666', '#FF9276'] : ['#CDCDCD', '#C3C3C3']
                }
                text="Next"
              />
            )}
          </TouchableOpacity>
          {submitError && <Text style={styles.resend}>{submitError}</Text>}
          {showResend ? (
            <TouchableOpacity
              onPress={() => {
                setShowResend(false);
                loginWithPhoneNo();
                setTimeout(() => {
                  setShowResend(true);
                }, 5000);
              }}>
              <Text style={styles.resend}>Resend Code</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.resend}>Wait 30 second to resend code</Text>
          )}
        </View>
      ) : (
        <>
          <Text style={styles.heading}>Let's get Started</Text>
          <View style={styles.cover}>
            <Text style={styles.para}>
              Please enter your mobile number to continue
            </Text>
            <View style={styles.form}>
              <View style={styles.input}>
                <IntlPhoneInput
                  phoneInputStyle={{color: '#000'}}
                  onChangeText={onChangeText}
                  defaultCountry="IN"
                />
              </View>
              {isValid && <Image source={Tick} style={styles.tick} />}
            </View>
            <TouchableOpacity
              onPress={() => {
                isValid && loginWithPhoneNo();
              }}>
              <GradientButton
                colors={
                  isValid ? ['#0ebe7e', '#0ebe7e'] : ['#CDCDCD', '#C3C3C3']
                }
                text={'Continue'}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          marginTop: 100,
        }}>
        <Text
          style={{fontSize: 12, color: '#264653', fontFamily: 'Lato-Regular'}}>
          For LogIn with other methods{' '}
        </Text>
        <TouchableOpacity onPress={() => setPhone(false)}>
          <Text
            style={{
              fontSize: 12,
              color: '#5880FF',
              fontFamily: 'Lato-Regular',
            }}>
            Click Here
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 45,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 25,
    color: '#264653',
    marginBottom: 10,
    letterSpacing: 0.8,
    width: '100%',
    marginTop: 40,
    textAlign: 'center',
  },
  form: {
    borderWidth: 0.5,
    borderColor: '#707070',
    borderRadius: 2,
    marginBottom: '10%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  para: {
    fontFamily: 'Lato-Regular',
    color: '#304157',
    opacity: 0.64,
    fontSize: 13,
    lineHeight: 18,
    width: '90%',
    marginBottom: 6,
  },
  cover: {
    marginTop: '35%',
  },
  input: {
    width: '90%',
  },
  tick: {
    height: 12,
    width: 15,
  },
  varcode: {
    borderWidth: 0.5,
    borderColor: '#707070',
    borderRadius: 2,
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 14,
    marginBottom: 20,
    marginTop: 30,
    color: '#000',
  },
  resend: {
    color: '#E76F51',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
  },
});

export default PhoneLogin;
