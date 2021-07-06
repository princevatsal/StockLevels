import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
  ImageBackground,
  ScrollView,
  Picker,
  Modal,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Brand from './assets/brand.png';
import Youtube from './assets/youtube.png';
import Background from './assets/background.png';
import Glass from './assets/glass.png';
import Keep from './assets/keep.png';
import Add from './assets/plus.png';
import Cross from './assets/cross.png';
import Send from './assets/send.png';
import Minus from './assets/minus.png';
export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [types, setTypes] = useState(['FUT', 'STX', 'NON']);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([
    {
      type: 'FUT',
      name: 'Nifty',
    },
    {
      type: 'FUT',
      name: 'BankNifty',
    },
    {
      type: 'STX',
      name: 'Reliance',
    },
    {
      type: 'STX',
      name: 'SBI',
    },
  ]);
  const [filteredData, setFilteredData] = useState([]);

  const Option = ({type, ticker}) => {
    return (
      <View style={styles.option}>
        <View style={styles.left}>
          <Text style={styles.optTxt1}>{type}</Text>
          <Text style={styles.optTxt2}>
            {ticker.length > 23 ? ticker.slice(0, 23) + '..' : ticker}
          </Text>
        </View>
        <View style={styles.right}>
          <View style={styles.addBtn}>
            <Image style={styles.addIcon} source={Add} />
          </View>
        </View>
      </View>
    );
  };
  const Ticker = ({type, ticker}) => {
    return (
      <TouchableOpacity style={styles.optionT}>
        <View style={styles.left}>
          <Text style={styles.optTxt1T}>{type}</Text>
          <Text style={styles.optTxt2T}>
            {ticker.length > 23 ? ticker.slice(0, 23) + '..' : ticker}
          </Text>
        </View>
        <View style={styles.right}>
          {/* <View style={styles.addBtn}> */}
          <Image style={styles.addIcon2} source={Send} />
          {/* </View> */}
        </View>
      </TouchableOpacity>
    );
  };
  const Watch = ({ticker}) => {
    return (
      <View style={styles.optionW}>
        <TouchableOpacity style={styles.minusCover}>
          <Image source={Minus} style={styles.minus} />
        </TouchableOpacity>
        <View
          style={{
            ...styles.row,
            paddingVertical: 5,
          }}>
          <Text style={styles.headingW}>{ticker}</Text>
          <View style={styles.rightTargets}>
            <Text style={styles.target}>T1</Text>
            <Text style={styles.target}>T2</Text>
            <Text style={{...styles.target, borderRightWidth: 0}}>T3</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={{...styles.headingW, color: 'green'}}>
            {'Buy above'} 15900
          </Text>
          <View style={styles.rightTargets}>
            <Text style={{...styles.target, color: 'green'}}>15,666</Text>
            <Text style={{...styles.target, color: 'green'}}>15,700</Text>
            <Text
              style={{...styles.target, color: 'green', borderRightWidth: 0}}>
              15,800
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={{...styles.headingW, color: 'red'}}>
            {'Sell Below'} 14900
          </Text>
          <View style={styles.rightTargets}>
            <Text style={{...styles.target, color: 'red'}}>14,756</Text>
            <Text style={{...styles.target, color: 'red'}}>14,556</Text>
            <Text
              style={{
                ...styles.target,
                color: 'red',
                borderRightWidth: 0,
              }}>
              14,440
            </Text>
          </View>
        </View>
      </View>
    );
  };
  useEffect(() => {
    var q = query.trim();
    if (q == '') {
      setFilteredData([]);
    } else {
      if (type == 'ALL') {
        setFilteredData(data.filter(item => item.name.includes(q)));
      } else {
        setFilteredData(
          data
            .filter(item => item.type == type)
            .filter(item => item.name.includes(q)),
        );
      }
    }
  }, [query, type]);
  return (
    <ImageBackground source={Background} style={styles.container}>
      {/* <ScrollView style={styles.containerCover}> */}
      <Text style={styles.headText}>Tutorial..</Text>
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
      <View style={styles.bottom}>
        <Text style={styles.brand}>Search Your Ticker Here </Text>

        <View style={styles.search}>
          <Image style={styles.glass} source={Glass} />
          <TextInput
            value={query}
            onChangeText={e => {
              setQuery(e);
            }}
            style={styles.query}
          />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Image style={styles.glass2} source={Keep} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.options}>
        {filteredData.map(item => (
          <Option type={item.type} ticker={item.name} />
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalCover}>
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.crossCover}>
              <Image style={styles.cross} source={Cross} />
            </TouchableOpacity>
            <Text style={styles.selectTxt}>Select Category</Text>
            <Picker
              selectedValue={type}
              style={{height: 50, width: 150}}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => {
                setType(itemValue);
                setModalVisible(false);
              }}>
              <Picker.Item label="ALL" value="ALL" />
              {types.map(item => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.brand2}>Your Tickers </Text>
          <Ticker type="FUT" ticker="Nifty" />
          <Ticker type="STX" ticker="SBI" />
        </View>
        <View style={styles.content}>
          <Text style={styles.brand2}>Your WatchList </Text>
          <Watch type="FUT" ticker="Nifty 1500 CE 14 AUG 2021" />
          <Watch type="STX" ticker="REliance 500 CE 18 AUG 2021" />
        </View>
      </ScrollView>
      {/* </ScrollView> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerCover: {
    flex: 1,
  },
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
    marginTop: 20,
  },
  brand: {
    fontSize: 22,
    fontFamily: 'Nunito-SemiBold',
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
  search: {
    flexDirection: 'row',
    borderBottomColor: '#b7d9cd',
    borderBottomWidth: 1,
    marginTop: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  glass: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  glass2: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    position: 'relative',
    top: 4,
  },
  query: {
    fontSize: 15,
    fontFamily: 'Lato-SemiBold',
    fontWeight: '100',
    width: '85%',
  },
  options: {
    marginHorizontal: '5%',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#a1a1a1',
    borderBottomWidth: 0.3,
  },
  optionT: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#0ebe7e',
    marginBottom: 10,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  optionW: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 4,
    paddingTop: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {},
  addBtn: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  addIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  addIcon2: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginRight: 10,
  },
  optTxt1: {
    fontFamily: 'Lato-Bold',
    marginRight: 30,
    fontSize: 16,
  },
  optTxt2: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '100',
    fontFamily: 'Nunito-SemiBold',
  },
  optTxt1T: {
    fontFamily: 'Lato-Bold',
    marginRight: 30,
    fontSize: 16,
    color: '#fff',
  },
  optTxt2T: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '100',
    fontFamily: 'Nunito-SemiBold',
  },
  optTxt1W: {
    fontFamily: 'Lato-Bold',
    marginRight: 30,
    fontSize: 16,
    color: '#000',
  },
  optTxt2W: {
    color: '#000',
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '100',
    fontFamily: 'Nunito-SemiBold',
  },
  modalCover: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: 180,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  selectTxt: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 17,
    position: 'relative',
    right: 5,
  },
  cross: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  crossCover: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  content: {
    marginTop: 20,
    width: '100%',
    padding: 15,
  },
  brand2: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    marginBottom: 15,
  },
  headingW: {fontFamily: 'Lato-Bold', width: '50%'},
  rightTargets: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
  },
  target: {
    width: '30%',
    borderRightWidth: 1,
    borderRightColor: '#a1a1a1',
    textAlign: 'center',
    fontFamily: 'Lato-SemiBold',
  },
  minus: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  minusCover: {
    position: 'absolute',
    right: 20,
    top: 5,
  },
});
