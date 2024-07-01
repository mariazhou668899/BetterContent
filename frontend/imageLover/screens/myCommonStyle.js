// commonStyles.js
import { StyleSheet } from 'react-native';

export default mystyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: -1,
    backgroundColor: 'transparent',
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: "#6e6869",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color:  "#fc5c65",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    height: 50,
    width: 300,
    backgroundColor: "#039be5",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color:  "#f57c00",
    marginTop: 10,
  },
});
