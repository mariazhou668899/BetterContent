import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: -1,
    backgroundColor: 'transparent',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    //orderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  subtitle: {
    color: '#039be5',
    //margintop: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  
});