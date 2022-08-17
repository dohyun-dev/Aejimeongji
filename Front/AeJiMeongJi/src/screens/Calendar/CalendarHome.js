import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {Colors} from '../../constants/styles';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import CalendarNav from './../../components/nav/CalendarNav';
import {format, setDay} from 'date-fns';

import TodoList from '../../components/Todo/TodoList';

const CalendarHome = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth((now.getMonth() + 1).toString());
    setDay(now.getDate().toString());
    setDate(
      now.getFullYear() +
        '-0' +
        (now.getMonth() + 1).toString() +
        '-' +
        now.getDate().toString(),
    );
  }, []);

  LocaleConfig.locales['calendarData'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan.',
      'Feb.',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul.',
      'Aug',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = 'calendarData';

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.nav}>
        <CalendarNav imageName />
      </View>
      <View style={styles.contentbox}>
        <Calendar
          style={{backgroundColor: '#FFF8EA'}}
          markingType={'period'}
          markedDates={{
            [date]: {
              marked: true,
              dotColor: '#50cebb',
              color: '#50cebb',
              textColor: 'white',
            },
          }}
          onDayPress={day => {
            setSelectedDate(day.dateString);

            setModalVisible(true);
          }}
        />
      </View>
      <TodoList
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedDate={selectedDate}
      />
    </View>
  );
};
export default CalendarHome;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.back100,
  },
  nav: {
    height: responsiveHeight(8),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  contentbox: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.back100,
    marginBottom: responsiveHeight(7),
  },
});
