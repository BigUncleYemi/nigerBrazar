import AsyncStorage from '@react-native-async-storage/async-storage';

class Utils {
  static setObjectValue = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch(e) {
      // save error
      //console.log('error');
    }
  }

  static setStringValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch(e) {
      // save error
      //console.log('error');
    }
  }

  static getMyStringValue = async (key) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch(e) {
      // save error
      //console.log('error');
    }
  }

  static clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
      //console.log('error');
    }
  
    console.log('Done.')
  }

  static getMyObject = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // save error
      //console.log('error');
    }
  }

  static _getFilename = path => {
    const fileArray = path.split('/');
    return fileArray[fileArray.length - 1];
  }

  static cloudinaryUpload = async (photo) => {
    try {
      const data = new FormData()
      data.append('file', photo)
      data.append('upload_preset', 'gqhtsc1p')
      data.append("cloud_name", "biguncleyemi")
      const res = await fetch("https://api.cloudinary.com/v1_1/biguncleyemi/upload", {
        method: "post",
        body: data
      });
      return res.json();
    } catch(err) {
      alert("An Error Occured While Uploading")
    }
  }
}

export default Utils;