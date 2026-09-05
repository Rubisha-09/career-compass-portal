actor {
  public shared ({ caller }) func greet(name : Text) : async Text {
    "Hello, " # name # "! Your Career Compass Portal is up and running.";
  };
};
