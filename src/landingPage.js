import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Brand from './assets/brand.png';
import Youtube from './assets/youtube.png';
import Background from './assets/background.png';
export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  return (
    <ImageBackground source={Background} style={styles.container}>
      <Text style={styles.headText}>How TO ... </Text>
      <View style={styles.videoCover}>
        <View style={styles.video}>
          <YoutubePlayer
            height={300}
            play={true}
            forceAndroidAutoplay={false}
            videoId={'84WIaK3bl_s'}
            onChangeState={e => {
              if (e != 'unstarted') {
                setLoading(false);
              } else {
                setLoading(true);
              }
            }}
          />
        </View>
        {loading && (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.youtube.com/watch?v=izQ0jdLZWco');
            }}
            style={styles.loading}>
            <Image source={Youtube} style={styles.youtube} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.imgCover}>
        <Image source={Brand} style={styles.img} />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.brand}>Analyse Stocks Like A Pro</Text>
        <Text style={styles.info}>
          With us , make your trading super simple and profitable
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnTxt}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6fcfa',
  },
  loading: {
    height: 210,
    width: '100%',
    position: 'absolute',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6fcfa',
    elevation: 4,
  },
  youtube: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  video: {
    width: '100%',
    height: 210,
    borderRadius: 5,
    overflow: 'hidden',
  },
  headText: {
    fontSize: 27,
    fontFamily: 'Nunito-Bold',
    marginBottom: 15,
  },
  videoCover: {
    width: '100%',
    alignItems: 'center',
  },
  bottom: {
    alignItems: 'center',
  },
  brand: {
    fontSize: 30,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  info: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    width: '80%',
    textAlign: 'center',
    marginVertical: 15,
  },
  button: {
    paddingHorizontal: 100,
    paddingVertical: 18,
    backgroundColor: '#16a086',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
    elevation: 4,
  },
  btnTxt: {
    fontFamily: 'Lato-Boldr',
    fontSize: 15,
    color: '#fff',
  },
  imgCover: {
    width: '100%',
    alignItems: 'center',
  },
  img: {
    width: '95%',
    height: 300,
    resizeMode: 'contain',
  },
});
