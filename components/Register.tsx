import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Register() {
    const [formValue, setFormValue] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
        address: '',
        phone_number: '',
        email: '',
        password: '',
        c_password: '',
        role: '0',
    });

    const navigation = useNavigation();

    const onChange = (name, value) => {
        setFormValue({ ...formValue, [name]: value });
    };

    const handlePhoneNumberChange = (value) => {
        const inputPhoneNumber = value.replace(/\D/g, '');
        const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);
        setFormValue({ ...formValue, phone_number: formattedPhoneNumber });
    };

    const formatPhoneNumber = (phone_number) => {
        const cleaned = ('' + phone_number).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }

        return phone_number;
    };

    const handleSubmit = async () => {
      const formData = new FormData();
      Object.keys(formValue).forEach(key => {
          formData.append(key, formValue[key]);
      });
  
      try {
          const response = await fetch("http://localhost/geingeemu/public/api/register", {
              method: 'POST',
              body: formData,
              headers: {
                  'Accept': 'application/json'
              }
          });
          
          const textResponse = await response.text(); // Get response as text
          console.log("Raw response:", textResponse);
  
          try {
              const jsonResponse = JSON.parse(textResponse); // Try parsing as JSON
              console.log("JSON response:", jsonResponse);
              navigation.navigate("Home");
          } catch (jsonError) {
              console.error("Error parsing JSON:", jsonError, textResponse);
          }
      } catch (error) {
          console.error("Network error:", error);
      }
  };
  

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter first name"
                value={formValue.firstname}
                onChangeText={(text) => onChange('firstname', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter last name"
                value={formValue.lastname}
                onChangeText={(text) => onChange('lastname', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="yyyy-mm-dd"
                value={formValue.birthdate}
                onChangeText={(text) => onChange('birthdate', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="1234 Main St"
                value={formValue.address}
                onChangeText={(text) => onChange('address', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="000-000-0000"
                value={formValue.phone_number}
                onChangeText={handlePhoneNumberChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={formValue.email}
                onChangeText={(text) => onChange('email', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={formValue.password}
                onChangeText={(text) => onChange('password', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={formValue.c_password}
                onChangeText={(text) => onChange('c_password', text)}
            />
            <Button
                title="Submit"
                onPress={handleSubmit}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default Register;