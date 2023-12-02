import * as React from 'react';
import { Text, View, Switch, StyleSheet,Image, ImageBackground,TextInput  } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from 'react-native-progress/Circle'; // bo Circle

function Device({ name, icon }) {
    const [isEnabled, setIsEnabled] = React.useState(false);
  
    const toggleSwitch = () => {
      setIsEnabled((previousState) => !previousState);
    };
  
    return (
      <View style={[styles.deviceContainer, isEnabled ? styles.deviceContainerOn : null]}>
        <View style={[styles.deviceBox, isEnabled ? styles.deviceBoxOn : null]}>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#2400FF' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={[styles.switchLabel, isEnabled ? styles.switchLabelOn : null]}>
            {isEnabled ? 'ON' : 'OFF'}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={icon}
              color={isEnabled ? '#2400FF' : '#D9D9D9'}
              size={60}
            />
          </View>
          <Text style={[styles.deviceText, isEnabled ? styles.deviceTextOn : null]}>{name}</Text>
        </View>
      </View>
    );
  }
  
  const Tab = createMaterialBottomTabNavigator();
  const HomeScreen = () => {
    const temperature = 30; // Giả định giá trị nhiệt độ
    const progressValue = temperature / 100; // Chuyển đổi thành phần trăm sang giá trị trong khoảng từ 0 đến 1

    return (
      <ImageBackground
        source={require('./img/nen6.jpg')}
        style={styles.container}>
        <Text style={styles.hometext}>
        HOME DASHBOARD
        </Text>       
        <View style={styles.rectangle}>
        <View style={styles.progressItem}>
            <ProgressBar
              progress={progressValue}
              size={160}
              borderWidth={2}
              color="red"
              unfilledColor="lightgray"
              thickness={10}
              showsText
              formatText={() => `${Math.round(temperature)}%`}
              direction="clockwise"
              endAngle={180} // Giữ nguyên góc 360 độ
              startAngle={90} // Đặt vị trí bắt đầu thành 0 độ để bắt đầu từ phía dưới
              strokeCap="round"
            />
            <Text style={styles.progressLabel}>Nồng độ Ôxy </Text>
          </View>
          {/* <Image
            source={require('./img/nang.png')}
            style={styles.image}
            resizeMode="contain"
          /> */}
          {/* Display temperature and humidity */}
          <View style={styles.temperatureHumidityContainer}>
          <View style={styles.boxnd}>
            <View style={styles.iconTextContainer1}>
              {/* Temperature Icon */}
              <Image
                source={require('./img/nang.png')}
                style={styles.icon}
              />
              <Text style={styles.temperatureHumidityText1}>
              50°
              </Text>
            </View>
            </View>
            <View style={styles.boxda}>
            <View style={styles.iconTextContainer2}>
              {/* Temperature Icon */}
              <Image
                source={require('./img/doam.png')}
                style={styles.icon}
              />
              <Text style={styles.temperatureHumidityText2}>
                80%
              </Text>
            </View>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <Device name="Led 1" icon="lightbulb-on" />
          <Device name="Led 2" icon="lightbulb-on" />
        </View>
        <View style={styles.row}>
          <Device name="Motor 1" icon="engine" />
          <Device name="Motor 2" icon="engine" />
        </View>
      </ImageBackground>
    );
  };
  const Setting = () => {
    return (
      <ImageBackground
      source={require('./img/nen5.jpg')}
      style={styles.container}>
      <View style={styles.setting}>
        {/* <Text style={styles.settingtxt}>SETTING DASHBOARD</Text> */}
        <View style={styles.rowsetting}>
          <Device name="Led 1" icon="lightbulb-on" />
          <View style={styles.deviceContainersetting}>
            <View style={styles.setting1a}>
              <Text style={styles.deviceText}>START</Text>
              
                <TextInput
                  style={styles.input1}
                  placeholder="Time on"
                  keyboardType="numeric" // Xác định bàn phím phải là bàn phím số
                  onChangeText={(text) => {
                    // Xử lý giá trị nhập liệu, bạn có thể lưu trữ trong state hoặc sử dụng theo cần thiết
                    console.log(text);
                  }}
                />
              
            </View>
            <View style={styles.setting1b}>
              <Text style={styles.deviceText}>END</Text>
              <TextInput
                  style={styles.input2}
                  placeholder="Time off"
                  keyboardType="numeric" // Xác định bàn phím phải là bàn phím số
                  onChangeText={(text) => {
                    // Xử lý giá trị nhập liệu, bạn có thể lưu trữ trong state hoặc sử dụng theo cần thiết
                    console.log(text);
                  }}
                />
            </View>
          </View>
        </View>
        <View style={styles.rowsetting}>
          <Device name="Led 2" icon="lightbulb-on" />
          <View style={styles.deviceContainersetting}>
            <View style={styles.setting1a}>
              <Text style={styles.deviceText}>START</Text>
              <View style={styles.setting1a}>
                <TextInput
                  style={styles.input1}
                  placeholder="Time on"
                  keyboardType="numeric" // Xác định bàn phím phải là bàn phím số
                  onChangeText={(text) => {
                    // Xử lý giá trị nhập liệu, bạn có thể lưu trữ trong state hoặc sử dụng theo cần thiết
                    console.log(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.setting1b}>
              <Text style={styles.deviceText}>END</Text>
              <TextInput
                  style={styles.input2}
                  placeholder="Time off"
                  keyboardType="numeric" // Xác định bàn phím phải là bàn phím số
                  onChangeText={(text) => {
                    // Xử lý giá trị nhập liệu, bạn có thể lưu trữ trong state hoặc sử dụng theo cần thiết
                    console.log(text);
                  }}
                />
            </View>
          </View>
        </View>
        <View style={styles.rowsetting}>
          <Device name="Motor 1" icon="engine" />
          <View style={styles.deviceContainersetting}>
            <View style={styles.setting1a}>
              <Text style={styles.deviceText}>START</Text>
              <View style={styles.setting1a}>
                <TextInput
                  style={styles.input1}
                  placeholder="Temp Min "
                  keyboardType="numeric" // Xác định bàn phím phải là bàn phím số
                  onChangeText={(text) => {
                    // Xử lý giá trị nhập liệu, bạn có thể lưu trữ trong state hoặc sử dụng theo cần thiết
                    console.log(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.setting1b}>
              <Text style={styles.deviceText}>END</Text>
              <TextInput
                  style={styles.input2}
                  placeholder="Temp Max"
                  keyboardType="numeric" // Xác định bàn phím phải là bàn phím số
                  onChangeText={(text) => {
                    // Xử lý giá trị nhập liệu, bạn có thể lưu trữ trong state hoặc sử dụng theo cần thiết
                    console.log(text);
                  }}
                />
            </View>
          </View>
        </View>
        <View style={styles.rowsetting}>
          <Device name="Motor2" icon="engine" />
          <View style={styles.deviceContainersetting}>
            <View style={styles.setting1a}>
              <Text style={styles.deviceText}>START</Text>
              <View style={styles.setting1a}>
                <TextInput
                  style={styles.input1}
                  placeholder="Temp Min "
                  keyboardType="numeric" // Xác định bàn phím phải là bàn phím số
                  onChangeText={(text) => {
                    // Xử lý giá trị nhập liệu, bạn có thể lưu trữ trong state hoặc sử dụng theo cần thiết
                    console.log(text);
                  }}
                />
              </View>
            </View>
            <View style={styles.setting1b}>
              <Text style={styles.deviceText}>END</Text>
              <TextInput
                  style={styles.input2}
                  placeholder="Temp Max"
                  keyboardType="numeric" // Xác định bàn phím phải là bàn phím số
                  onChangeText={(text) => {
                    // Xử lý giá trị nhập liệu, bạn có thể lưu trữ trong state hoặc sử dụng theo cần thiết
                    console.log(text);
                  }}
                />
            </View>
          </View>
        </View>
      </View>
      </ImageBackground>
    );
  };
  
  const Profile = () => {
    return (
      <ImageBackground      
      source={require('./img/backround.jpg')}
      style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('./img/add.jpg')} // Add the path to your avatar image
          style={styles.avatar}
        />
        <Text style={styles.profileText}>Phan Tấn Quốc</Text>
        <Text style={styles.profileText}>MSSV: 20139086</Text>
        <Text style={styles.profileText}>SDT: 0817277368</Text>
        <Text style={styles.profileText}>Chuyên ngành: Hệ thống nhúng và IoT</Text>
      </View>
      </ImageBackground>
    );
  };
  
    const HomeScreen1 = () => {
        
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#e91e64"
        barStyle={{ backgroundColor: 'rgba(25, 255, 255, 0.1)' }} // Set the background color with opacity
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={'red'} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarLabel: 'Setting',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      width:'100%',
      height:'100%' // Di chuyển về phía dưới
    },
    hometext:{
      fontSize:30,
      marginLeft:60,
      marginBottom:20,
      color:'#172E40',
      fontWeight:'900'
    },
    rectangle: {
      alignSelf:'center', // Căn giữa theo chiều ngang
      width:370,
      height: 250, // Độ cao của khung hình chữ nhật
      // backgroundColor: 'blue', // Màu sắc của khung hình chữ nhật
      marginBottom:20,
      borderRadius:10,
      overflow: 'hidden',
      marginRight:-5, // Đảm bảo hình ảnh không vượt qua khung chữ nhật
  
          // Thêm đường viền đậm
      borderWidth: 3, // Độ rộng của đường viền
      borderColor: '#000000', // Màu của đường viền
      backgroundColor: 'rgba(113,178,255,0.5)', // Màu nền với độ trong suốt
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      // alignItems: 'center',
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 30,
    },
    deviceContainer: {
      // justifyContent: 'center',
      // alignItems: 'center',
      marginBottom: 10, // Khoảng cách giữa các khung
    },
    deviceBox: {
      backgroundColor: '#F9F5F5', // màu nền xám
      paddingVertical: 5,
      paddingHorizontal: 40, // Đặt giá trị padding chiều rộng tùy chọn
      borderRadius: 22, // bo tròn khung
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    deviceText: {
      marginVertical: 5,
      color:'#000000',
      marginLeft:12,
      fontWeight:'900',
      fontSize:15,

      
    },
      image: {
      width: '100%',
      height: '100%',
      marginTop:20,
      marginLeft:-20,
  
    },
    switchContainer: {
      flexDirection:'row-reverse',
      position: 'absolute',
      top: 10,
      right: 5,
      alignItems: 'flex-start', // Align items to the top
      justifyContent: 'flex-start', // Justify content to the top
    },
    iconContainer: {
      marginTop: 40,
      
    },
  
  
    switchLabel: {
      marginRight:35, // Updated from marginRight to marginLeft
      fontSize: 17,
      fontWeight:'500',
      color: '#2C4457',
    },
  
    // deviceBoxOn: {
    //   backgroundColor: '#E5F3FF', // Color when the switch is ON
    // },
  
    switchLabelOn: {
      color: '#000000', // Text color when the switch is ON
    },
    deviceTextOn: {
      color: '#000000', // Text color when the switch is ON
    },
  
    temperatureHumidityContainer: {
      position: 'absolute',
      bottom: 10,
      left: 10,
    },
  
    temperatureHumidityText1: {
      fontSize: 25,
      fontWeight: 'bold',
      marginLeft:-5,
      color: '#F2821A',
    },
    temperatureHumidityText2: {
      fontSize: 25,
      fontWeight: 'bold',
      marginLeft:-12,
      color: '#009BDD',
    },
    boxnd:{
        width:110,
        height:110,
        backgroundColor: 'rgba(249,245,245,0.7)', // Màu nền với độ trong suốt
        borderRadius:30,
        marginBottom:5,
        justifyContent:'center',
        alignItems:'center',

    },
    iconTextContainer1: {
      width:100,
      height:100,
      marginBottom:2,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 1000, // Đảm bảo hình tròn
      borderWidth: 5,
      borderColor: '#F2821A',
    },
    boxda:{
        width:110,
        height:110,
        backgroundColor: 'rgba(249,245,245,0.7)', // Màu nền với độ trong suốt
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
    },
    iconTextContainer2: {
      width:100,
      height:100,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 1000, // Đảm bảo hình tròn
      borderWidth: 5,
      borderColor: '#009BDD',
    },
  
    icon: {
      width: 50,
      height: 50,
      marginRight: 5,
      
      
    },
    profileContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    avatar: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 20,
    },
  
    profileText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'#ffffff',
    },
    progressItem: {
        width: '60%',
        height:'90%',
        alignItems: 'center',
        justifyContent:'center',
        marginLeft:130,
        marginTop:10,
      backgroundColor: 'rgba(249,245,245,0.7)', // Màu nền với độ trong suốt
      borderRadius:30,
      },

      progressLabel:{
        color:'#EB0D0D',
        fontSize:20,
        fontWeight:'900',
      },


      // setting 

      setting: {
        flex: 1,
        justifyContent: 'flex-end',
        width:'100%',
        height:'100%' // Di chuyển về phía dưới
      },
      settingtxt:{
        fontSize:30,
        marginLeft:60,
        marginBottom:20,
        color:'#172E40',
        fontWeight:'900'
      },

      rowsetting: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 30,
      },

      deviceContainersetting:{
        flexDirection: 'row',
        backgroundColor:'#61C1BC',
        height:138,
        width: 200,
        marginLeft:30,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
      },

      input1: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 5,
        marginTop:20,
      },
      input2: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 5,
        marginTop:20,
      },

      setting1b:{
        marginLeft:10,
      },

      
      

  });

export default HomeScreen1;