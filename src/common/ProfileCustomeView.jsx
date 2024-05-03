import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput
  } from "react-native";
  import { colors, font } from "../constants";

  export default function ProfileCustomView (
    {navigation, 
        item_value, 
        item_setValue, 
        item_Ref, 
        item_Ref_next, 
        item_return_key_type, 
        item_place_holder,
        item_label,
        item_is_bank,
        item_input
    }){
    return (
        <View style={{flex:1}}>
        {
            item_is_bank ?
            <View style={{marginTop:20}}>
            <Text style={{width:'100%', fontFamily:font.GoldPlay_Medium,color:'#999999', fontSize:14}}>{item_label}</Text>
            <TextInput
                  value={item_value}
                   ref={item_Ref}   
                  inputMode={(item_input == undefined) ? "text" : "numeric"} 
                  style={{
                   flex:1, height:40,
                   fontSize:14,
                   fontFamily:font.GoldPlay_SemiBold,
                   marginTop:3,
                   color:colors.BLACK
                    
                  }}
                  returnKeyType={item_return_key_type}
                  placeholder={item_place_holder}
                  placeholderTextColor={"#999999"}
                
                  onChangeText={(text) => item_setValue(text)}
                  cursorColor="white"
                  maxLength={32}
                  onSubmitEditing={()=> {item_Ref_next ? item_Ref_next.current.focus() : null }}
                />
          </View>
            :
            <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={{width:'30%', fontFamily:font.GoldPlay_Medium,color:'#999999', fontSize:14}}>{item_label}</Text>
            <TextInput
                  value={item_value}
                   ref={item_Ref}   
                  inputMode="text"
                  style={{
                   flex:1, height:50,
                   fontSize:14,
                   fontFamily:font.GoldPlay_SemiBold,
                   marginTop:3,
                   color:colors.BLACK
                  
                  }}
                  returnKeyType={item_return_key_type}
                  placeholder={item_place_holder}
                  placeholderTextColor={"#999999"}
                
                  onChangeText={(text) => item_setValue(text)}
                  cursorColor="white"
                  maxLength={32}
                  onSubmitEditing={()=> {item_Ref_next ? item_Ref_next.current.focus() : null }}
                />
          </View>
        }    
       
          <View style={{height:1, backgroundColor:colors.YELLOW}}/>
      </View>
    );
  }