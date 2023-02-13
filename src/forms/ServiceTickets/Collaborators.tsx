import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { DividerComponent, Loader, NotFound, SingleLineField } from '../../components';
import { useHookstate } from '@hookstate/core';
import { ticketStore } from '../../stores/ticketStore';
// @ts-ignore
import { WINDOW_WIDTH } from '../../constants';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { deleteCollaborator } from '../../screens/Agenda/utils/functions';


const Collaborators = () => {
  const ticketCollaborators: any = useHookstate(
    ticketStore?.ticketCollaborators,
  ).get();
  const [loader, setLoader] = useState(false);

  const renderList = ({ item, index }: { item: any; index: number }) => {
    return (
      <SingleLineField
        title={item?.attributes?.user?.user_name}
        subTitle={item?.attributes?.user?.email}
        enable={false}
        leftIcon="account-circle"
        rightChild={
          <MCI
            name="window-close"
            size={25}
            onPress={() => {
              deleteCollaboratorFunc(item?.id, item?.attributes?.ticket?.id);
            }}
          />
        }
      />
    );
  };

  const deleteCollaboratorFunc = (collaboratorId: string, ticketId: string) => {
    setLoader(true);
    deleteCollaborator(collaboratorId, ticketId)
      .then(res => {
        setLoader(false);
      })
      .catch(err => {
        console.log('delete Tickets failed', err);
        setLoader(false);
      });
  };

  return (
    <>
      <Loader isShow={loader} />
      {ticketCollaborators?.length > 0 ? (
        <FlatList
          data={ticketCollaborators ?? []}
          contentContainerStyle={{
            paddingVertical: 5,
            paddingBottom: 80,
          }}
          renderItem={renderList}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: 8 }}
          ItemSeparatorComponent={DividerComponent}
        />
      ) : (
        <NotFound label="Collaborators" />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    elevation: 1,
    width: WINDOW_WIDTH,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    width: WINDOW_WIDTH,
  },
  dividerStyle: {
    opacity: 0.2,
    transform: [{ scale: 2 }],
  },
});

export default Collaborators;
