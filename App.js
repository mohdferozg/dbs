// import React in our code
import React, {useState, useEffect} from 'react';
 
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
 
const App = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
 
  useEffect(() => {
     fetchApiData();
  }, [0]);

  const fetchApiData = () =>{
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.map(data =>{
          data.returnRandomNumber = returnRandomNumber()
        });

        let recursiveArray = responseJson;
          for (let i=0;i<5;i++){
            recursiveArray = recursiveArray.concat(returnDuplicateArray(recursiveArray));
          }

        setFilteredDataSource(recursiveArray);
        setMasterDataSource(recursiveArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
 const addAndReturnRandomNumber = (newArray,jsArrayLen) => {
    newArray.map(obj => ({...obj, returnRandomNum : returnRandomNumber() }))
    return newArray;
  }
 const returnDuplicateArray = (jsArray) =>{
    const cloneArray = jsArray.map(a => ({...a}));
    const newArray = addAndReturnRandomNumber(cloneArray, jsArray.length);
    return newArray;
  }

  
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
 
  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <View>
          <Text
        style={styles.itemStyle}>
        {item.id}
        {': '}
        {item.body}
        {"\n"}
       </Text>
      <Text
      style={styles.randomNumberStyle}>
         {item.returnRandomNumber}
        </Text>
      </View>
      
      
    );
  };
 
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  
  const returnRandomNumber = () =>{
    const returnRandomNumber =  Math.floor(Math.random() * (9000000000 - 1000000000 + 1) + 1000000000);
    return returnRandomNumber;
  }
  const reRenderingList = () => {
    searchFilterFunction('');
    fetchApiData();
 }
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <Image style={styles.imageStyle} source={require('./assets/doggo_walk.gif')} />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search a text"
        />
        
         <TouchableOpacity
                    style = {styles.renderButton}
                     onPress = {() => reRenderingList()}>
                     <Text style = {styles.text}>
                        Re-render
                     </Text>
                  </TouchableOpacity>
            <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    backgroundColor: '#FFFFFF',
  },
  randomNumberStyle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  renderButton: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginLeft: 5,
      width:100
  },
  imageStyle: {
    marginTop:20,
    height:300
  }
});
 
export default App;