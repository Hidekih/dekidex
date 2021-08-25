import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { View } from 'react-native';

import { Moves, MovesByGen } from '../../../utils/types';
import { RowDividerGradient } from '../../RowDividerGradient';
import { SectionTitle } from '../../Section/SectionTitle';
import { SkeletonContent } from '../../Skeleton/SkeletonContent';

import { 
  Container,
  GameVersionsList,
  GameVersionButton,
  GameVersionTitle,
  RowContent,
  DataTitle,
  DataValue,
} from './styles';
import { captalize, compareLevel } from '../../../utils/functions';
import { useTheme } from 'styled-components';

type VersionGroupResponse = {
  results: [
    { 
      name: string;
    }
  ]
}

type MovesListProps = {
  data: {
    moves: Moves[];
    colors: [
      string,
      string
    ];
  };
}

export function MovesList({ data } : MovesListProps) {
  const theme = useTheme();
  const [ selectedGameVersion, setSelectedGameVersion ] = useState('');
  const [ moves, setMoves ] = useState< null | MovesByGen>(null);
  const [ gameVersions, setGameVersions ] = useState<string[]>([]);

  const handleSelectGameVersion = useCallback((gameVersion: string) => {
    setSelectedGameVersion(gameVersion);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: gameVersionsData } = await axios.get<VersionGroupResponse>(
          'https://pokeapi.co/api/v2/version-group/'
        );
  
        const parsedData = gameVersionsData.results.map(version => {
          return version.name
        });

        const movesData: MovesByGen = {} as MovesByGen;

        parsedData.forEach(version => {
          movesData[version] = [];
        });

        data.moves.forEach(({ move, version_group_details }) => {
          version_group_details.forEach(({ level_learned_at, move_learn_method, version_group }) => {
            try {
              movesData[version_group.name].push({ 
                name: captalize(move.name),
                level_learned_at,
                learn_method: captalize(move_learn_method.name),
              });
            } catch (error) {
              return
            }
          });
        });
  
        setSelectedGameVersion(parsedData[0]);
        setGameVersions(parsedData);

        Object.keys(movesData).forEach(item => {
          movesData[item].sort(compareLevel);
        });
      
        setMoves(movesData);
      } catch {
        return;
      }
    }

    fetchData();
  }, [data]);

  if (!moves) {
    return (
      <SkeletonContent 
        bgColor={theme.background2} 
        indicatorColor={theme.background1} 
        mt={16}
        w="100%"
        h="160px"
      />
    )
  }

  return (
    <Container>
      <SectionTitle titles={["Moves (select a game)"]}/>

      <RowDividerGradient 
        colors={data.colors} 
      />

      <GameVersionsList>
        { 
          gameVersions && gameVersions.length > 0 && gameVersions.map(version => (
            <GameVersionButton 
              key={version} 
              onPress={() => handleSelectGameVersion(version)}
              isSelected={version === selectedGameVersion}
            >
              <GameVersionTitle isSelected={version === selectedGameVersion}>
                {version}
              </GameVersionTitle>
            </GameVersionButton>
          ))
        }
      </GameVersionsList>

      <RowDividerGradient 
         colors={data.colors} 
      />

      <SectionTitle titles={['Move title', 'Learn method']} />
      { 
        moves[selectedGameVersion].length > 0 
          ? moves[selectedGameVersion]
            .map(({ name, learn_method, level_learned_at }, index) => (
              <View key={index}>
                <RowDividerGradient 
                  colors={data.colors} 
                />
                <RowContent>
                  <DataValue>
                    {name}
                  </DataValue>
                  { learn_method === 'Level-up' ? (
                    <DataValue>Level: {level_learned_at}</DataValue>   
                  ) : (
                    <DataValue>{learn_method}</DataValue>
                  )}
                </RowContent>
              </View> 
        )) : (
          <>
            <RowDividerGradient 
              colors={data.colors} 
            />
            <RowContent style={{ padding: 16, height: 'auto' }}>
              <DataTitle>
                {'Impossible to find moves informations about this pokemon :('}
              </DataTitle>
            </RowContent>
          </>
        )
      }
    </Container>
  )
}