import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { View } from 'react-native';

import { captalize } from '../../../utils/captalize';
import { Moves, MovesByGen } from '../../../utils/types';
import { compareLevel } from '../../../utils/compareLevel';
import { RowDividerGradient } from '../../RowDividerGradient';
import { SectionTitle } from '../../Section/SectionTitle';
import { SkeletonContent } from '../../Skeleton/SkeletonContent';

import Colors from '../../../styles/colors';
import { 
  Container,
  GameVersionsList,
  GameVersionButton,
  GameVersionTitle,
  RowContent,
  DataTitle,
  DataValue,
} from './styles';

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
  const [ selectedGameVersion, setSelectedGameVersion ] = useState('');
  const [ moves, setMoves ] = useState<MovesByGen>({} as MovesByGen);
  const [ gameVersions, setGameVersions ] = useState<string[]>([]);
  const [ isFetching, setIsFetching ] = useState(true);

  const handleSelectGameVersion = useCallback((gameVersion: string) => {
    setSelectedGameVersion(gameVersion);
  }, []);

  useEffect(() => {
    axios.get<VersionGroupResponse>('https://pokeapi.co/api/v2/version-group/')
      .then(res => {
        const { data: gameVersionsData } = res;

        const parsedData = gameVersionsData.results.map(version => {
          return version.name
        });

        setSelectedGameVersion(parsedData[0]);
        setGameVersions(parsedData);
      })
        .catch(_ => { return });

    const movesData: MovesByGen = {} as MovesByGen;

    // A função a seguir DEVE ser executada DPS do useEffect
    // parsedData.forEach(version => {
    //   movesData[version] = [];
    // });

    movesData["red-blue"] = [];
    movesData["yellow"] = [];
    movesData["gold-silver"] = [];
    movesData["crystal"] = [];
    movesData["ruby-sapphire"] = [];
    movesData["emerald"] = [];
    movesData["firered-leafgreen"] = [];
    movesData["diamond-pearl"] = [];
    movesData["platinum"] = [];
    movesData["heartgold-soulsilver"] = [];
    movesData["black-white"] = [];
    movesData["colosseum"] = [];
    movesData["xd"] = [];
    movesData["black-2-white-2"] = [];
    movesData["x-y"] = [];
    movesData["omega-ruby-alpha-sapphire"] = [];
    movesData["sun-moon"] = [];
    movesData["ultra-sun-ultra-moon"] = [];
    movesData["lets-go"] = [];
    movesData["sword-shield"] = [];

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

    Object.keys(movesData).forEach(item => {
      movesData[item].sort(compareLevel);
    });
  
    setMoves(movesData);
    setIsFetching(false);
  }, []);

  if (isFetching) {
    return (
      <SkeletonContent 
        bgColor={Colors.background[3]} 
        indicatorColor={Colors.background[1]} 
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
        moves[selectedGameVersion] && moves[selectedGameVersion].length > 0 
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