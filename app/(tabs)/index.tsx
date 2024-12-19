import { CButton } from '@/components/buttons/CButton';
import { CControlPanel } from '@/components/containers/CControlPanel';
import { CMainScreen } from '@/components/CMainScreen';
import { CSwipeRightHandler } from '@/components/containers/CSwipeRightHandler';

import WheelButton from '@/assets/images/buttons/WheelButton';
import TeamButton from '@/assets/images/buttons/TeamButton';
import MissionsButton from '@/assets/images/buttons/MissionsButton';


export default function Index() {
  return (
    <CSwipeRightHandler>
      <CMainScreen />
      <CControlPanel>
        <CButton href="/wheel">
          <WheelButton width={90} height={90} />
        </CButton>
        <CButton href="/team">
          <TeamButton width={90} height={90} />
        </CButton>
        <CButton href="/missions">
          <MissionsButton width={90} height={90} />
        </CButton>
      </CControlPanel>
    </CSwipeRightHandler>
  );
}
