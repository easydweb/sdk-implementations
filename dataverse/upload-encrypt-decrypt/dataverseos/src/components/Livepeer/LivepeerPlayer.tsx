import React from "react";

import { Player, ReactClient } from "@livepeer/react";

interface IProps {
  reactClient: ReactClient;
  playbackId: string;
}

export const LivepeerPlayer = ({ playbackId }: IProps) => {
  return (
    <Player
      title='Waterfalls'
      playbackId={playbackId}
      showPipButton
      showTitle={false}
      aspectRatio='16to9'
      controls={{
        autohide: 3000,
      }}
      theme={{
        borderStyles: { containerBorderStyle: undefined },
        radii: { containerBorderRadius: "10px" },
      }}
    />
  );
};
