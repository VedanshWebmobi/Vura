import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    BackHandler,
    Dimensions,Animated,Easing,SafeAreaView
  } from "react-native";
 
  import CommonHeaderNew from "../common/CommonHeader_new";
import { colors, font } from "../constants";
  export default function HelpAndSupport({navigation}){

    return(
        <>
        <SafeAreaView  style={{flex : 0, backgroundColor:colors.YELLOW}} />
        <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
        <StatusBar backgroundColor={colors.YELLOW} />
        <CommonHeaderNew 
        navigation={navigation}
        header_color={colors.YELLOW} 
        header_title={"HELP & SUPPORT"} 
        header_title_color={colors.BLACK}/>
        <View style={{alignItems:'center', padding:16}}> 
            <Text style={{
                fontFamily:font.GoldPlay_SemiBold, 
                fontSize:20,
                color:colors.BLACK, marginTop:'20%'}}>GET IN TOUCH</Text>
            <Text style={{
                fontFamily:font.GoldPlay_SemiBold, 
                fontSize:12,
                textAlign:'center',
                color:colors.BLACK, marginTop:20
            }}>
                If you have any inquiries get in touch with us.{"\n"}We'll be happy to help you.
                </Text>    
             <TouchableOpacity style={{flexDirection:'row',
             paddingStart:40,
             paddingEnd:40,
             paddingTop:15,
             paddingBottom:15,
             marginTop:40, 
             backgroundColor:colors.YELLOW, 
             borderRadius:30,alignItems:'center'
                }}>
                <Image style={{height:20, width:20, resizeMode:'contain'}}
                 source={require('../../assets/sms.png')}/>
                 <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:16, marginStart:10}}>hello@vura.ae</Text>
                </TouchableOpacity>   
        </View>
        </SafeAreaView>
        </>
    );
  }