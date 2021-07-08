
import React from 'react';
import { TouchableOpacity, View } from 'react-native';



const ApiaryComponent = ({ props}) => {
    const{
        ApiaryComponent:{
            id,
            name,
            description
        }
  

}   = props;

return(
    <TouchableOpacity>
        <Text>{name}</Text>
    </TouchableOpacity>

)

}
export default ApiaryComponent;