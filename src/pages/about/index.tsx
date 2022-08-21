import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
import type { ReactElement } from 'react'
import { useEffect } from 'react'

import { basicInfo, detailInfo } from '~/api/modules/about'
import AboutBasic from '~/components/in-page/About/about-basic'
import AboutDetail from '~/components/in-page/About/about-detail'
import { CardContent } from '~/components/layouts/BasicLayout/CardContent'
import type { BasicDataType, DetailDataType } from '~/models/About'
import { useStore } from '~/store'

type Iprops = { basic: BasicDataType[]; detail: DetailDataType[] }

export const About: NextPage<Iprops> = (props) => {
  const { appStore, basicStore, detailStore } = useStore()
  useEffect(() => {
    basicStore.updateabout(props.basic)
    detailStore.updateabout(props.detail)
  }, [])
  return (
    <>
      <div
        className="px-10 phone:px-1 animate__animated animate__fadeIn h-full"
        style={!appStore.viewport.mobile ? { overflow: 'overlay' } : undefined}
      >
        {basicStore.basic && <AboutBasic aboutData={basicStore.basic} />}
        {detailStore.detail && <AboutDetail detail={detailStore.detail} />}
      </div>
    </>
  )
}

//@ts-ignore
About.getLayout = function getLayout(page: ReactElement) {
  return <CardContent>{page}</CardContent>
}

export async function getServerSideProps() {
  const [basic, detail] = await Promise.all([basicInfo(), detailInfo()])
  console.log(basic, detail)

  return {
    props: {
      basic: basic.data,
      detail: detail.data,
    },
  }
}

export default observer(About)
