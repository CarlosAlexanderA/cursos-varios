import {Formik, useField} from 'formik';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import StyledText from '../components/StyledText';
import {loginValidationSchema} from '../validationSchemas/login.js';

const initialValues = {
  email: '',
  password: '',
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 20,
    marginTop: -5,
  },
  form: {
    margin: 12,
  },
});

const FormikInputValue = ({name, ...props}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <StyledTextInput
        error={meta.error}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        {...props}
      />
      {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
    </>
  );
};

export default function LoginPage() {
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={initialValues}
      onSubmit={(val) => console.log(val)}
    >
      {({handleChange, handleSubmit, values}) => {
        return (
          <View style={styles.form}>
            <FormikInputValue name="email" placeholder="E-mail" />
            <FormikInputValue
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <Button onPress={handleSubmit} title="Log in" />
          </View>
        );
      }}
    </Formik>
  );
}
