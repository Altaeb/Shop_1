import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import email from 'react-native-email'
 
export default class SendMail extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button title="Send Mail" onPress={this.handleEmail} />
            </View>
        )
    }
 
    handleEmail = () => {
        const to = ['wpiusa@email.com', ] // string or array of email addresses
        const fname="tom lee";
        email(to, {
            // Optional additional arguments
            subject: 'Show how to use',
            body: `Some body right here: ${fname}
             first line
             second line
            `
        }).catch(console.error)
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})