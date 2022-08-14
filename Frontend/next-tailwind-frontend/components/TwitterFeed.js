import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
function TwitterFeed() {
  return (
    <div className="w-full">
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="SkymetWeather"
        options={{ height: 600 }}
      />
    </div>
  );
}

export default TwitterFeed;
