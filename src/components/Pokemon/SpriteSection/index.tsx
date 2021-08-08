import React, { useState, useCallback, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { CurrentSprites, Sprites } from '../../../utils/types';
import { ChangeSpriteColorButton } from '../ChangeSpriteColorButton';
import { SkeletonContent } from '../../Skeleton/SkeletonContent';

import Colors from '../../../styles/colors';
import {
  HeaderButtons,
  SpriteColorSection,
  SpriteGenderSection,
  ChangeSpriteGenderButton,
  PokemonAvatarContainer,
  GradientBackground,
  PokeImage,
} from './styles';

type SpriteSectionProps = {
  data: {
    gradientColors: [
      string,
      string,
    ];
    sprites: Sprites;
    typeColor: string;
    is_unique_gender: boolean;
  }
}

export function SpriteSection({ data }: SpriteSectionProps) {
  const [ colorSprite, setColorSprite ] = useState<'normal' | 'shiny'>('normal');
  const [ genderSprite, setGenderSprite ] = useState<'male' | 'female'>('male');
  const [ currentSprites, setCurrentSprites ] = useState<CurrentSprites>({} as CurrentSprites); 
  const [ isFetching, setIsFetching ] = useState(true);

  const handleToggleColorSprite = useCallback((string: 'normal' | 'shiny') => {
    setColorSprite(string);
  }, []);

  const handleToggleGenderSprite = useCallback((string: 'male' | 'female') => {
    setGenderSprite(string);
  }, []);

  useEffect(() => {
    const {
      back_default,
      back_female,
      back_shiny,
      back_shiny_female,
      front_default,
      front_female,
      front_shiny,
      front_shiny_female,
    } = data.sprites;
    
    setCurrentSprites({
      normal: {
        female: {
          front: front_female,
          back: back_female || back_default,
        },
        male: {
          front: front_default,
          back: back_default,
        }
      },
      shiny: {
        female: {
          front: front_shiny_female,
          back: back_shiny_female || back_shiny,
        },
        male: {
          front: front_shiny,
          back: back_shiny
        }
      }
    });

    setColorSprite('normal');
    setGenderSprite('male');

    setIsFetching(false)
  }, [data]);

  if (isFetching) {
    return (
      <SkeletonContent 
        bgColor={Colors.background[3]} 
        indicatorColor={Colors.background[1]} 
        mt={16}
        w="100%"
        h="188px"
      />
    )
  }

  return (
    <>
      <HeaderButtons typeColor={data.typeColor}>
        <SpriteColorSection>
          <ChangeSpriteColorButton 
            disabled={!currentSprites.shiny.male.front}
            handleToggleSprite={() => handleToggleColorSprite('normal')}
            isSelected={colorSprite === 'normal'}
            title="Normal"
          />
          <ChangeSpriteColorButton 
            disabled={!currentSprites.shiny.male.front}
            handleToggleSprite={() => handleToggleColorSprite('shiny')}
            isSelected={colorSprite === 'shiny'}
            title="Shiny"
          />
        </SpriteColorSection>

        <SpriteGenderSection>
          <ChangeSpriteGenderButton 
            disabled={!currentSprites.normal.female.front}
            onPress={() => handleToggleGenderSprite('male')}
          >
            { genderSprite === 'male' && !data.is_unique_gender ? (
              <Ionicons  name="male" size={26} color={"#438FE6"}/>
            ) : (
              <Ionicons  name="male" size={28} color={Colors.background[1]}/>
            )}
          </ChangeSpriteGenderButton>
          <ChangeSpriteGenderButton 
            disabled={!currentSprites.normal.female.front}
            onPress={() => handleToggleGenderSprite('female')}
          >
            { genderSprite === 'female' ? (
              <Ionicons  name="female" size={26} color={"#DB736E"}/>
            ) : (
              <Ionicons  name="female" size={28} color={Colors.background[1]}/>
            )}
          </ChangeSpriteGenderButton>
        </SpriteGenderSection>
      </HeaderButtons>

      <PokemonAvatarContainer>
        <GradientBackground
          colors={[ data.typeColor, Colors.background[3]]}
        />
        <PokeImage 
          resizeMode='cover'
          source={{ uri: currentSprites[colorSprite][genderSprite].front || '' }}
        />
        <PokeImage 
          resizeMode='cover'
          source={{ uri: currentSprites[colorSprite][genderSprite].back || '' }}
        />
      </PokemonAvatarContainer>
    </>
  )
}