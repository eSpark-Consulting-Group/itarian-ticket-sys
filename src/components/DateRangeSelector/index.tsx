import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import FA from 'react-native-vector-icons/FontAwesome';

import { Theme } from '../../theme/colors';

import DatePicker from '@react-native-community/datetimepicker';

const DateRangeSelector = () => {
    const { colors, dark }: Theme = useTheme();
    const [showDate, setShowDate] = useState(false);

    const openDatePicker = () => {
        setShowDate(true);
    };

    const closeDatePicker = (event: any, date: any) => {
        setShowDate(false);
    };

    return (
        <>
            {showDate && (
                <DatePicker
                    mode="date"
                    value={new Date()}
                    minimumDate={new Date(2022, 7, 28)}
                    maximumDate={new Date(2022, 8, 3)}
                    onChange={closeDatePicker}
                />
            )}
            <Pressable
                onPress={openDatePicker}
                android_ripple={{ color: dark ? '#ffffff0e' : '#0000000e' }}
                style={{
                    height: '10%',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f5f5f5',
                    elevation: 2,
                    paddingHorizontal: 20,
                }}>
                <View>
                    <Text style={{ color: colors.text }} >Jul 28 - Aug 3</Text>
                    <Text style={{ color: '#28648f', fontWeight: 'bold' }}>144.00</Text>
                </View>
                <FA color={colors.text} name="chevron-down" size={15} />
            </Pressable>
        </>
    );
};

export default DateRangeSelector;
