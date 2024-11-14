import { CBackground } from '@/components/CBackground';
import { CButton } from '@/components/CButton';
import { CContainer } from '@/components/CContainer';
import { CMainScreen } from '@/components/CMainScreen';

import WheelButton from '@/assets/images/buttons/WheelButton';
import TeamButton from '@/assets/images/buttons/TeamButton';
import MissionsButton from '@/assets/images/buttons/MissionsButton';


export default function Index() {
  return (
    <CBackground>
      <CMainScreen />
      <CContainer>
        <CButton href="/wheel">
          <WheelButton width={90} height={90} />
        </CButton>
        <CButton href="/team">
          <TeamButton width={90} height={90} />
        </CButton>
        <CButton href="/missions">
          <MissionsButton width={90} height={90} />
        </CButton>
      </CContainer>
    </CBackground>
  );
}
