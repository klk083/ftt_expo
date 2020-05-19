import React from 'react'
import WelcomeScreen from "../common_files/WelcomeScreen";
import Privacy from "../common_files/Privacy";
import Terms_of_service from "../common_files/Terms_of_service";
import SignUp from "./SignUp";
import Verifying_mob_num from "./Verifying_mob_num";

class SignUpStack extends React.Component{
    redner(){
        return(
            <>
            <AppStack.Screen name='SignIn' component={WelcomeScreen}
                             options={{headerShown: false, headerTitle: ''}}/>
        <AppStack.Screen name='Privacy' component={Privacy}
                         options={{headerTitle: 'Personvern'}}/>
        <AppStack.Screen name='TermsOfService' component={Terms_of_service}
                         options={{headerTitle: 'Servicevilkår'}}/>
        <AppStack.Screen name='Number_registration' component={SignUp}
                         options={{headerTitle: 'Registrer mobilnummer'}}/>
        <AppStack.Screen name='Number_verification' component={Verifying_mob_num}
                         options={{headerTitle: 'Verifisering'}}/>
                         </>
        )
    }
}
