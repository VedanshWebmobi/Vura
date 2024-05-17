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
  import DropDownPicker from "react-native-dropdown-picker";
  import React, { useEffect, useMemo, useRef, useState } from "react";
  import { axiosCallAPI } from "../Api/Axios";
  import axios from "axios";
  import { POSTAL_CODE } from "../Api/Utils";

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
        item_input,
        item_is_gender,
        item_is_dob,
        item_dob_press, 
        item_handle_pincode_result,
        item_handle_account_number,
        item_handle_ifsc_code
    }){
      const [open, setOpen] = useState(false);  
      const onInputChange = value => {
        // const { value } = e.target;
        // console.log('Input value: ', value);
     
        const re = /^[a-zA-Z ]*$/;
        if (value === "" || re.test(value)) {
          item_setValue(value);
        }
      }

      const GetDetailsFromPincode = async(pincode)=>{
        const requestOptions = {
          headers: {
            Accept: "application/json",
          },
          
        };
        axios.get(POSTAL_CODE+pincode, requestOptions).then((response) =>{
          
              if(response.data[0].Status === "Success"){
                console.log("Success",response.data);
               console.log("City",response.data[0].PostOffice[0].Block); 
               item_handle_pincode_result(response.data[0].PostOffice[0].Block,
                response.data[0].PostOffice[0].State,
                response.data[0].PostOffice[0].Country)
              }
              else if(response.data[0].Status === "Error"){
                item_handle_pincode_result("",
                  "",
                  "")
              }
        }).catch((error) => {
          console.log("Error",error.response.data);
        })
       
      }

    
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
              
                  onChangeText={(text) =>{
                    if(item_handle_account_number)
                    {
                    item_handle_account_number(text)
                    }
                    if(item_handle_ifsc_code){
                      item_handle_ifsc_code(text)
                    }
                     item_setValue(text)}}
                  cursorColor="white"
                  maxLength={32}
                  onSubmitEditing={()=> {item_Ref_next ? item_Ref_next.current.focus() : null }}
                />
          </View>
            : item_is_gender ? 
            <View style={{flexDirection:"row", alignItems:"center", height:50}}>
               <Text style={{width:'27%', fontFamily:font.GoldPlay_Medium,color:'#999999', fontSize:14}}>{item_label}</Text>
               <DropDownPicker
                open={open}
                value={item_value}
                items={[{label: 'Male', value: 'Male'},
                {label: 'Female', value: 'Female'},
                {label: 'Other', value: 'Other'},
              ]}
              dropDownContainerStyle={{
                backgroundColor: "#fff",
                width:'73%',
                borderWidth:0

              }}
                // setItems={setCategories}
                setOpen={setOpen}
                setValue={item_setValue}
                onSelectItem={(value)=>{console.log(value)}}
                placeholder={item_place_holder}
                placeholderStyle={{color:"#999999"}}
                textStyle={{ fontSize:14,
                  fontFamily:font.GoldPlay_SemiBold, color:colors.BLACK, padding:0 }}
                style={{
                  borderWidth:0,   
                  height: 50,
                  width:'73%',
                 
                }}
                
              />
            </View>
            : item_is_dob ?
            <View style={{flexDirection:"row", alignItems:"center", height:50}}>
  <Text style={{width:'30%', fontFamily:font.GoldPlay_Medium,color:'#999999', fontSize:14}}>{item_label}</Text>
  <TouchableOpacity style={{width:'70%'}} onPress ={()=>item_dob_press()}>
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
                  editable={false}
                  onChangeText={(text) => item_setValue(text)}
                  cursorColor="white"
                  maxLength={32}
                  onSubmitEditing={()=> {item_Ref_next ? item_Ref_next.current.focus() : null }}
                />
  </TouchableOpacity>
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
                  onChangeText={(text) => {
                    if(item_input === "only_alphabet"){
                        onInputChange(text);
                    }
                    else if(item_label === "Pin Code:"){
                      if(text.length >= 6){
                         GetDetailsFromPincode(text); 
                      }
                      item_setValue(text)
                    }
                    else{
                    item_setValue(text)
                    }
                  }}
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