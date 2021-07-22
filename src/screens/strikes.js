import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Glass from '../assets/glass.png';
import Background from '../assets/background.png';
import Add from '../assets/plus.png';
import Tick from '../assets/tick.png';
import firestore from '@react-native-firebase/firestore';
import {UserContext} from '../context/userContext';
export default function Strikes({navigation, route}) {
  const {symbol} = route.params;
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');
  const [query3, setQuery3] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const {updateWatchlist, watchlist} = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    firestore()
      .collection('DailyBhav')
      .where('symbolName', '==', symbol)
      .get()
      .then(data => {
        if (data.docs.length > 0) {
          const bigData = data.docs.map(item => item.data());
          const dataToset = bigData.reduce((sum, item) => {
            return sum.concat(
              item.data.map(itm => ({
                EXPIRY_DT: itm.EXPIRY_DT,
                OPTION_TYP: itm.OPTION_TYP,
                STRIKE_PR: itm.STRIKE_PR,
              })),
            );
          }, []);
          setData(dataToset);
          setFilteredData(dataToset);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [symbol]);
  const Option = ({expiry, type, strike}) => {
    return (
      <View style={styles.option}>
        <View style={styles.left}>
          <Text style={styles.optTxt2}>
            {symbol.length > 26 ? symbol.slice(0, 26) + '..' : symbol}
          </Text>
          <Text style={styles.optTxt2}>
            {type.length > 26 ? type.slice(0, 26) + '..' : type}
          </Text>
          <Text style={styles.optTxt2}>
            {strike.length > 26 ? strike.slice(0, 26) + '..' : strike}
          </Text>
          <Text style={styles.optTxt2}>
            {expiry.length > 26 ? expiry.slice(0, 26) + '..' : expiry}
          </Text>
        </View>
        <View style={styles.right}>
          {!watchlist.find(
            item =>
              item.symbol == symbol &&
              item.expiry == expiry &&
              item.strike == strike &&
              item.type == type,
          ) ? (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                updateWatchlist([...watchlist, {symbol, expiry, type, strike}]);
              }}>
              <Image style={styles.addIcon} source={Add} />
            </TouchableOpacity>
          ) : (
            <View style={styles.addBtn}>
              <Image style={styles.addIcon} source={Tick} />
            </View>
          )}
        </View>
      </View>
    );
  };
  useEffect(() => {
    var q1 = query1.trim().toUpperCase();
    var q2 = query2.trim().toUpperCase();
    var q3 = query3.trim().toUpperCase();
    setFilteredData(
      data.filter(
        item =>
          item.EXPIRY_DT.includes(q3) &&
          item.OPTION_TYP.includes(q2) &&
          item.STRIKE_PR.includes(q1),
      ),
    );
  }, [query1, query2, query3]);
  return (
    <ImageBackground source={Background} style={styles.container}>
      <Text style={styles.brand}>
        Add "{symbol}" instrument to the WatchList
      </Text>
      <View style={styles.bottom}>
        <Text style={styles.brand}>Search Your Ticker Here </Text>
        <View style={styles.search}>
          <Image style={styles.glass} source={Glass} />
          <TextInput
            value={query1}
            onChangeText={e => {
              setQuery1(e);
            }}
            keyboardType="numeric"
            style={styles.query}
            placeholderTextColor="#a1a1a1"
            placeholder="ie:- 4500"
          />
        </View>
        <View style={styles.search}>
          <Image style={styles.glass} source={Glass} />
          <TextInput
            value={query2}
            onChangeText={e => {
              setQuery2(e);
            }}
            style={styles.query}
            placeholderTextColor="#a1a1a1"
            placeholder="ie:- CE/PE/XX"
          />
        </View>
        <View style={styles.search}>
          <Image style={styles.glass} source={Glass} />
          <TextInput
            value={query3}
            onChangeText={e => {
              setQuery3(e);
            }}
            style={styles.query}
            placeholderTextColor="#a1a1a1"
            placeholder="ie:- 02-sept-2021"
          />
        </View>
      </View>
      <ScrollView style={styles.options} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size={30} color="green" style={styles.loading} />
        ) : (
          filteredData
            .slice(0, 20)
            .map((item, index) => (
              <Option
                expiry={item.EXPIRY_DT}
                type={item.OPTION_TYP}
                strike={item.STRIKE_PR}
                key={'' + item.EXPIRY_DT + item.OPTION_TYP + item.STRIKE_PR}
              />
            ))
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6fcfa',
    paddingTop: 30,
  },
  brand: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 28,
    fontWeight: '100',
    textAlign: 'center',
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
    color: '#000',
  },
  options: {
    marginHorizontal: '1%',
    marginTop: 50,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#a1a1a1',
    borderBottomWidth: 0.3,
    marginBottom: 10,
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '84%',
    flexWrap: 'wrap',
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
    marginRight: 10,
  },
  loading: {marginTop: 100},
});
