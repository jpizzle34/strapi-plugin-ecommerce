import React from 'react';
import { useIntl } from 'react-intl';

import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import { Helmet } from 'react-helmet';
import { Layout, HeaderLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import getTrad from '../../utils/getTrad';
import Navigation from "../../components/Navigation";

const PluginPage = () => {
  useFocusWhenNavigate();
  const { formatMessage } = useIntl();


  const title = formatMessage({
    id: getTrad('name'),
    defaultMessage: 'Ecommerce',
  });

  return (
    <Layout>
      <Helmet title={title} />
      <Layout sideNav={<Navigation/>}>
        <div>
          <HeaderLayout
            title={title}
            subtitle={formatMessage({
              id: getTrad('description'),
              defaultMessage: 'Configure the ecommerce plugin',
            })}
          />
        </div>
      </Layout>
    </Layout>
  );
};

export default PluginPage;
