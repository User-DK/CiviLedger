
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const ViewRecordTile = ({item, fields, onSave, consultants, testers}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editBuffer, setEditBuffer] = useState(item);

  const handleChange = (field, value) => {
    setEditBuffer(prev => ({...prev, [field]: value}));
  };

  const handleSave = () => {
    onSave(editBuffer);
    setIsEditing(false);
  };

  return (
    <View style={styles.row}>
      {fields.map(field => {
        if (isEditing) {
          // If field is foreign key (consultant or tester), show a Picker
          if (
            field === 'entered_by' || // Consultant
            [
              'material_properties',
              'cube_preparation',
              'casting',
              'demoulding',
              'testing',
            ].includes(field) // Tester
          ) {
            const options = field === 'entered_by' ? consultants : testers;
            return (
              <View key={field} style={styles.inputCell}>
                <Picker
                  selectedValue={editBuffer[field] ?? ''}
                  onValueChange={value => handleChange(field, value)}>
                  <Picker.Item label="Select..." value="" />
                  {options.map(option => (
                    <Picker.Item
                      key={option.code}
                      label={option.name}
                      value={option.code}
                    />
                  ))}
                </Picker>
              </View>
            );
          } else {
            // Default: show TextInput for other fields
            return (
              <TextInput
                key={field}
                style={styles.inputCell}
                value={editBuffer[field]?.toString() || ''}
                onChangeText={text => handleChange(field, text)}
              />
            );
          }
        } else {
          return (
            <Text key={field} style={styles.cell}>
              {item[field] ?? ''}
            </Text>
          );
        }
      })}

      {isEditing ? (
        <>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsEditing(false);
              setEditBuffer(item);
            }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setIsEditing(true);
          }}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ViewRecordTile;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 6,
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 6,
  },
  inputCell: {
    flex: 1,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 6,
    textAlign: 'center',
  },
  editText: {
    color: 'blue',
    padding: 5,
  },
  saveText: {
    color: 'green',
    padding: 5,
  },
  cancelText: {
    color: 'red',
    padding: 5,
  },
});
