interface SourceDataItem {
  text: string;
  value: string;
  children?: SourceDataItem[];
}

type TreeProps = {
  sourceData: SourceDataItem[];
} & (
  {
    selected: string[],
    onChange: (newSelected: string[]) => void;
    multiple: true,
  } | {
    selected: string,
    onChange: (newSelected: string) => void;
    multiple?: false,
  }
);