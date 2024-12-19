import { CButton } from '@/components/buttons/CButton';
import { CControlPanel } from '@/components/containers/CControlPanel';
import { CMainScreen } from '@/components/CMainScreen';
import { CGestureHandler } from '@/components/containers/CGestureHandler';

import WheelButton from '@/assets/images/buttons/WheelButton';
import TeamButton from '@/assets/images/buttons/TeamButton';
import MissionsButton from '@/assets/images/buttons/MissionsButton';


export default function Index() {
  return (
    <CGestureHandler>
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
    </CGestureHandler>
  );
}
