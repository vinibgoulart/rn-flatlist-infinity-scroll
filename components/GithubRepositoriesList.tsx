import { FlatList, Text } from "react-native";

export type TGithubRepository = {
  full_name: string;
};

type TGithubRepositoriesListProps = {
  loading: boolean;
  refetching: boolean;
  repositories: TGithubRepository[];
  refetch: () => Promise<void>;
};

export const GithubRepositoriesList = ({
  loading,
  repositories,
  refetch,
  refetching,
}: TGithubRepositoriesListProps) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!repositories.length) {
    return <Text>No repositories found</Text>;
  }

  const renderItem = ({ item }: { item: TGithubRepository }) => (
    <Text style={{ fontSize: 16, color: "#000" }}>{item.full_name}</Text>
  );

  return (
    <>
      <FlatList
        data={repositories}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.full_name}-${index}`}
        showsVerticalScrollIndicator={false}
        onEndReached={refetch}
        onEndReachedThreshold={0.1}
      />
      {refetching && <Text>Refetching...</Text>}
    </>
  );
};
