import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Glass from '../assets/glass.png';
import Background from '../assets/background.png';
import Add from '../assets/plus.png';
import Tick from '../assets/tick.png';
export default function Strikes({navigation}) {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([
    {
      name: 'Nifty',
    },
    {
      name: 'BankNifty',
    },
    {
      name: 'Reliance',
    },
    {
      name: 'SBI',
    },
  ]);
  const Option = ({ticker, img}) => {
    return (
      <View style={styles.option}>
        <View style={styles.left}>
          <Text style={styles.optTxt2}>
            {ticker.length > 23 ? ticker.slice(0, 23) + '..' : ticker}
          </Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity style={styles.addBtn}>
            <Image style={styles.addIcon} source={img} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    var q = query.trim().toUpperCase();
    if (q == '') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.name.toUpperCase().includes(q)));
      setFilteredData(data.filter(item => item.name.toUpperCase().includes(q)));
    }
  }, [query]);
  return (
    <ImageBackground source={Background} style={styles.container}>
      <Text style={styles.brand}>Add NIFTY instrument to the WatchList</Text>
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
        </View>
      </View>
      <ScrollView style={styles.options} showsVerticalScrollIndicator={false}>
        {filteredData.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('subs');
            }}
            key={index}>
            <Option ticker={item.name} img={Add} />
          </TouchableOpacity>
        ))}
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
});
