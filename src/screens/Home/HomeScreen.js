import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { hotels,categories } from '../../data/menuArrays';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import { getBrandName } from '../../data/menuMockDataAPI';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });

   getHotelsFromApi = async () => {
    
     fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json')
    .then(response => response.json())
    .then((responseJson) => {
      
      this.setState({jobs: responseJson})
      console.log(":::: ++",this.state.jobs);
    })
    .catch(err => {
      console.log("err", err)
      //this.setState({ message: err.message });
      
    });
  };

  getMenuImagesFromApi = async () => {
    
     fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json')
    .then(response => response.json())
    .then((responseJson) => {
      
      this.setState({menuImages: responseJson})
      console.log(":::: ++",responseJson);
    })
    .catch(err => {
      console.log("err", err)
      //this.setState({ message: err.message });

    });
  };

  constructor(props) {
    super(props);
    //hotels(getArticlesFromApi()); 
    //getArticlesFromApi();
    this.state={
      jobs:[],
      menuImages:[]
    }
  }

  componentDidMount(){
    this.getHotelsFromApi();
    this.getMenuImagesFromApi();
  }
  onPressRecipe = item => {
    //this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: 
          this.state.menuImages.length <= 0 ?
          "":
          this.state.menuImages[parseInt(Math.random() * this.state.menuImages.length)].Image }} />
        <Text style={styles.title}>{item.Brand}</Text>
        <Text style={styles.category}>{getBrandName(item.Brand)}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.jobs}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.Brand}`}
        />
      </View>
    );
  }
}
