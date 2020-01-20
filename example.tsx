/** @jsx jsx */
import Drawer from '@atlaskit/drawer';
import { JiraIcon, JiraLogo } from '@atlaskit/logo';
import Popup from '@atlaskit/popup';
import { PopupProps } from '@atlaskit/popup/types';
import { jsx } from '@emotion/core';
import { Fragment, KeyboardEvent, useState } from 'react';
import { ButtonItem, HeadingItem, MenuGroup, Section } from '@atlaskit/menu';

import { ProfilePopup } from './packages/navigation/atlassian-navigation/examples/shared/ProfilePopup';
import { SwitcherPopup } from './packages/navigation/atlassian-navigation/examples/shared/SwitcherPopup';
import { HelpPopup } from './packages/navigation/atlassian-navigation/examples/shared/HelpPopup';
import { NotificationsPopup } from './packages/navigation/atlassian-navigation/examples/shared/NotificationsPopup';

import { DefaultCreate } from './packages/navigation/atlassian-navigation/examples/shared/Create';
import {
  AtlassianNavigation,
  PrimaryDropdownButton,
  PrimaryButton,
  ProductHome,
  Search,
  Settings,
} from '@atlaskit/atlassian-navigation';
import { useOverflowStatus } from './packages/navigation/atlassian-navigation/src/controllers/overflow';

const ProductHomeExample = () => (
  <ProductHome
    onClick={console.log}
    icon={JiraIcon}
    logo={JiraLogo}
    siteTitle="Hello"
  />
);

const SearchDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <Search onClick={onClick} text="Search..." tooltip="Search" />
      <Drawer isOpen={isOpen} onClose={onClose}>
        search drawer
      </Drawer>
    </Fragment>
  );
};

const SettingsDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <Settings isSelected={isOpen} onClick={onClick} tooltip="Settings" />
      <Drawer isOpen={isOpen} onClose={onClose}>
        settings drawer
      </Drawer>
    </Fragment>
  );
};

const ProjectsContent = () => (
  <MenuGroup>
    <Section>
      <HeadingItem>Starred</HeadingItem>
      <ButtonItem>Mobile Research</ButtonItem>
      <ButtonItem>IT Services</ButtonItem>
    </Section>
    <Section hasSeparator>
      <HeadingItem>Recent</HeadingItem>
      <ButtonItem>Engineering Leadership</ButtonItem>
      <ButtonItem>BAU</ButtonItem>
      <ButtonItem>Hardware Support</ButtonItem>
      <ButtonItem>New Features</ButtonItem>
      <ButtonItem>SAS</ButtonItem>
    </Section>
    <Section hasSeparator>
      <ButtonItem>View all projects</ButtonItem>
    </Section>
  </MenuGroup>
);

const FiltersContent = () => (
  <MenuGroup>
    <Section>
      <HeadingItem>Starred</HeadingItem>
      <ButtonItem>Assigned to me</ButtonItem>
      <ButtonItem>Created by me</ButtonItem>
      <ButtonItem>Updated recently</ButtonItem>
    </Section>
    <Section hasSeparator>
      <HeadingItem>Recent</HeadingItem>
      <ButtonItem>Engineering Leadership</ButtonItem>
      <ButtonItem>Viewed recently</ButtonItem>
      <ButtonItem>Resolved recently</ButtonItem>
      <ButtonItem>Done issues</ButtonItem>
    </Section>
    <Section hasSeparator>
      <ButtonItem>View all filters</ButtonItem>
    </Section>
  </MenuGroup>
);

const DashboardsContent = () => (
  <MenuGroup>
    <Section>
      <HeadingItem>Starred</HeadingItem>
      <ButtonItem>System dashboard</ButtonItem>
      <ButtonItem>Innovation week</ButtonItem>
    </Section>
    <Section hasSeparator>
      <HeadingItem>Recent</HeadingItem>
      <ButtonItem>Vanguard</ButtonItem>
      <ButtonItem>Pearformance</ButtonItem>
      <ButtonItem>Vertigo</ButtonItem>
    </Section>
    <Section hasSeparator>
      <ButtonItem>View all dashboards</ButtonItem>
    </Section>
  </MenuGroup>
);

const AppsContent = () => (
  <MenuGroup>
    <Section>
      <HeadingItem>Third party</HeadingItem>
      <ButtonItem>Portfolio</ButtonItem>
      <ButtonItem>Tempo timesheets</ButtonItem>
      <ButtonItem>Slack</ButtonItem>
      <ButtonItem>Invision</ButtonItem>
    </Section>
    <Section hasSeparator>
      <ButtonItem>Explore apps</ButtonItem>
    </Section>
  </MenuGroup>
);

type PrimaryDropdownProps = {
  content: PopupProps['content'];
  text: string;
  isHighlighted?: boolean;
};

const PrimaryDropdown = (props: PrimaryDropdownProps) => {
  const { content, text, isHighlighted } = props;
  const { isVisible } = useOverflowStatus();
  const [isOpen, setIsOpen] = useState(false);

  if (!isVisible) {
    return <ButtonItem>{text}</ButtonItem>;
  }

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowDown') {
      setIsOpen(true);
    }
  };

  return (
    <Popup
      content={content}
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-start"
      trigger={triggerProps => (
        <PrimaryDropdownButton
          onClick={onClick}
          onKeyDown={onKeyDown}
          isHighlighted={isHighlighted}
          isSelected={isOpen}
          {...triggerProps}
        >
          {text}
        </PrimaryDropdownButton>
      )}
    />
  );
};

const primaryItems = [
  <PrimaryButton
    href="http://www.atlassian.com"
    onClick={e => {
      if (e.ctrlKey || e.metaKey) {
        return;
      }
      e.preventDefault();
      console.log('onClick fired');
    }}
  >
    Home
  </PrimaryButton>,
  <PrimaryDropdown content={ProjectsContent} text="Projects" />,
  <PrimaryDropdown
    isHighlighted
    content={FiltersContent}
    text="Filters &amp; issues"
  />,
  <PrimaryDropdown content={DashboardsContent} text="Dashboards" />,
  <PrimaryDropdown content={AppsContent} text="Apps" />,
];

const JiraIntegrationExample = () => (
  <Fragment>
    <AtlassianNavigation
      primaryItems={primaryItems}
      renderAppSwitcher={SwitcherPopup}
      renderCreate={DefaultCreate}
      renderHelp={HelpPopup}
      renderNotifications={NotificationsPopup}
      renderProductHome={ProductHomeExample}
      renderProfile={ProfilePopup}
      renderSearch={SearchDrawer}
      renderSettings={SettingsDrawer}
      moreLabel="More"
    />
    <p>
      To display Notifications, ensure you're logged in to
      https://id.stg.internal.atlassian.com/login
    </p>
  </Fragment>
);

export default JiraIntegrationExample;
