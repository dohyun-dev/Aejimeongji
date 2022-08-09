import React, {Component} from 'react';
import {StyleSheet, Share, View, TouchableOpacity, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

class GuideShare extends Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <View style={{marginTop: 0, width: '10%'}}>
        <TouchableOpacity onPress={this.onShare}>
          <Image
            style={styles.shareLogo}
            resizeMode="contain"
            source={require('../../Assets/image/share.png')}
            title="Calendar"
          />
        </TouchableOpacity>
        {/* <Button onPress={this.onShare} title="공유하기" /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  shareLogo: {
    height: 55,
    width: '90%',
  },
});
export default GuideShare;
