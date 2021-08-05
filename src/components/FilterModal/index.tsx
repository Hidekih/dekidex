import React, { useCallback, useEffect, useState } from "react";
import { Modal, ModalProps } from 'react-native';
import { data } from '../../utils/data.json';
import { Feather } from '@expo/vector-icons';

import Colors from "../../styles/colors";
import { 
  Container, 
  Content, 
  BorderSpaceButton,
  RowContent,
  RowDividerWithText,
  Line,
  RowDividerTitle,
  Label,
  InputNumber,
  SubmitButton,
  GenerationList,
  GenItem,
  GenTitle,
} from './styles';
import { useNavigation } from "@react-navigation/core";


interface FilterModalProps extends ModalProps {
  toggleModal: () => void;
  handleSetStarterListByGen: (initial: number) => void;
}

export type GenProps = {
  name: string;
  initial: number;
}

export function FilterModal({ toggleModal, handleSetStarterListByGen ,...rest }: FilterModalProps) {
  const { navigate } = useNavigation();
  const [ pokedexNumber, setPokedexNumber ] = useState('');
  const [ selectedGen, setSelectedGen ] = useState<GenProps>({} as GenProps);
  const [ genDataProps, setGenDataProps ] = useState<GenProps[]>([]);

  const handleInputData = useCallback((value: string) => {
    if (Number(value) && Number(value) <= 898) {
      setPokedexNumber(value)
    } else if (value === '') {
      setPokedexNumber('')
    }
  }, []);

  const handleSelectPokemon = useCallback((value: string) => {
    if (!value) {
      return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${Number(value)}`;
    setPokedexNumber('');
    navigate('Pokemon', { url });
  }, [navigate]);

  const handleSelectGen = useCallback((data: GenProps) => {
    setSelectedGen(data);
    handleSetStarterListByGen(data.initial);
  }, []);
  
  useEffect(() => {
    setGenDataProps(data);
    setSelectedGen(data[0]);
  }, []);

  return (
    <Modal { ...rest }>
      <Container>
        <BorderSpaceButton onPress={toggleModal} /> 

        <Content>
            <Label>Search by pokedex number:</Label>
            <RowContent>
              <InputNumber  
                value={pokedexNumber} 
                onChangeText={value => handleInputData(value)} 
                keyboardType="number-pad"
                returnKeyType="send"
                onSubmitEditing={() => handleSelectPokemon(pokedexNumber)}
              />
              <SubmitButton onPress={() => handleSelectPokemon(pokedexNumber)}>
                <Feather name="search" size={32} color={Colors.background[3]} />
              </SubmitButton>
            </RowContent>

          <RowDividerWithText>
            <Line />
              <RowDividerTitle>or</RowDividerTitle>
            <Line />
          </RowDividerWithText>

          
          <Label>Filter by Gen:</Label>
          <GenerationList
            data={genDataProps}
            keyExtractor={({ name }) => name}
            renderItem={({ item }) => (
              <GenItem 
                key={item.name} 
                isSelected={selectedGen.name === item.name}
                onPress={() => handleSelectGen(item)}
              >
                <GenTitle isSelected={selectedGen.name === item.name}>{item.name}</GenTitle>
              </GenItem>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          
        </Content>

        <BorderSpaceButton onPress={toggleModal} />
      </Container>
    </Modal>
  )
}