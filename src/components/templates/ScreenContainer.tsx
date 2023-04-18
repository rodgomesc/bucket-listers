import React, {PropsWithChildren} from 'react';
import {styled, SafeAreaView, View} from 'dripsy';

const StyledSafeAreaView = styled(SafeAreaView)({
  backgroundColor: 'background',
  flex: 1,
});

const ContainerWrapper = styled(View)({
  flex: 1,
  paddingVertical: 'm',
  px: 'm',
});

const ScreenContainer: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <StyledSafeAreaView>
      <ContainerWrapper>{children}</ContainerWrapper>
    </StyledSafeAreaView>
  );
};

export default ScreenContainer;
