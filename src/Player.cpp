#include <napi.h>
#include <vector>

class Player : public Napi::ObjectWrap<Player> {
private:
    static Napi::FunctionReference constructor;
    std::vector<std::string> structure;
    std::string ID;
    void update(std::string move);
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    Player(Napi::CallbackInfo &info);
    Napi::Value getID(Napi::CallbackInfo &info);
    Napi::Value updateStructure(Napi::CallbackInfo &info);
    Napi::Value deleteFigure(Napi::CallbackInfo &info);
    ~Player();
};

Napi::FunctionReference Player::constructor;

Player::Player(Napi::CallbackInfo &info) : Napi::ObjectWrap<Player>(info) {
    ID = info[0].ToString().Utf8Value();
    auto color = info[1].ToString().Utf8Value();
    if(color == "black") {
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("pppppppp");
        structure.push_back("RNBQKBNR");
    } else {
        structure.push_back("RNBQKBNR");
        structure.push_back("pppppppp");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("        ");
    }
}

Player::~Player() {}

Napi::Value Player::getID(Napi::CallbackInfo &info) {
    return Napi::String().New(info.Env(), ID);
}

void Player::update(std::string move) {
    auto start = move.substr(0, 2);
    auto end = move.substr(2, 4);
    auto startWidth = static_cast<int>(start[0]) - 97;
    auto startHeight = static_cast<int>(start[1]) - 49;
    auto endWidth = static_cast<int>(end[0]) - 97;
    auto endHeight = static_cast<int>(end[1]) - 49;
    structure[endHeight][endWidth] = structure[startHeight][startWidth];
    structure[startHeight][startWidth] = ' ';
}

Napi::Value Player::updateStructure(Napi::CallbackInfo &info) {
    auto env = info.Env();
    auto move = info[0].ToString().Utf8Value();
    if( move.length() == 4 ) {
        update(move);
        return Napi::String().New(env, move);
    }
    if( move.length() > 4 ) {
        move = move.substr(1, 4);
        update(move);
        return Napi::String().New(env, move);
    }
    auto figure = move[0];
    move = move.substr(1, 2);
    auto width = static_cast<int>(move[0]) - 97;
    auto height = static_cast<int>(move[1]) - 49;
    switch( static_cast<int>(figure) ) {
        case 66: {
            std::string start = "";
            for(auto i = 0; i < structure.size(); i++) {
                for(auto j = 0; j < structure[i].length(); i++) {
                    if(structure[i][j] == figure) {
                        start.push_back( static_cast<char>(j + 97) );
                        start.push_back( static_cast<char>(i + 49) );
                        start.push_back(move[0]);
                        start.push_back(move[1]);
                        update(start);
                        return Napi::String().New(env, start);
                    }
                }
            }
            for(auto i = 0; i < structure.size(); i++) {
                for(auto j = structure[i].length() - 1; j >= 0; j--) {
                    if(structure[height][i] == figure) {
                        start.push_back( static_cast<char>(j + 97) );
                        start.push_back( static_cast<char>(i + 49) );
                        start.push_back(move[0]);
                        start.push_back(move[1]);
                        update(start);
                        return Napi::String().New(env, start);
                    }
                }
            }
            return Napi::String().New(env, "null");
        }
        case 75: {
            if( structure[(height - 1) < 0 ? 0 : height - 1][(width - 1) < 0 ? 0 : width - 1] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 96));
                start.push_back(static_cast<char>(height + 48));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[height][(width - 1) > 7 ? 7 : width - 1] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 96));
                start.push_back(static_cast<char>(height + 49));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height + 1) > 7 ? 7 : height + 1][(width - 1) < 0 ? 0 : width - 1] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 96));
                start.push_back(static_cast<char>(height + 50));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height - 1) < 0 ? 0 : height - 1][width] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 97));
                start.push_back(static_cast<char>(height + 48));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height + 1) > 7 ? 7 : height + 1][width] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 97));
                start.push_back(static_cast<char>(height + 50));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height - 1) < 0 ? 0 : height - 1][(width + 1) > 7 ? 7 : width + 1] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 98));
                start.push_back(static_cast<char>(height + 48));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[height][(width + 1) > 7 ? 7 : width + 1] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 98));
                start.push_back(static_cast<char>(height + 49));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height + 1) > 7 ? 7 : height + 1][(width + 1) > 7 ? 7 : width + 1] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 98));
                start.push_back(static_cast<char>(height + 50));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else {
                return Napi::String().New(env, "null");
            }
        }
        case 78: {
            if( structure[(height - 2) < 0 ? 0 : height - 2][(width - 1) < 0 ? 0 : width - 1] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 96));
                start.push_back(static_cast<char>(height + 47));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height - 2) < 0 ? 0 : height - 2][(width + 1) > 7 ? 7 : width + 1] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 98));
                start.push_back(static_cast<char>(height + 47));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height + 2) > 7 ? 7 : height + 2][(width - 1) < 0 ? 0 : width - 1] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 96));
                start.push_back(static_cast<char>(height + 51));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height + 2) > 7 ? 7 : height + 2][(width - 1) > 7 ? 7 : width - 1] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 98));
                start.push_back(static_cast<char>(height + 51));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height - 1) < 0 ? 0 : height - 1][(width - 2) < 0 ? 0 : width - 2] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 95));
                start.push_back(static_cast<char>(height + 48));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height + 1) > 7 ? 7 : height + 1][(width - 2) < 0 ? 0 : width - 2] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 95));
                start.push_back(static_cast<char>(height + 50));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height - 1) < 0 ? 0 : height - 1][(width + 2) > 7 ? 7 : width + 2] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 99));
                start.push_back(static_cast<char>(height + 48));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else if( structure[(height + 1) > 7 ? 7 : height + 1][(width + 2) > 7 ? 7 : width + 2] == figure ) {
                std::string start = "";
                start.push_back(static_cast<char>(width + 99));
                start.push_back(static_cast<char>(height + 50));
                start.push_back(move[0]);
                start.push_back(move[1]);
                update(start);
                return Napi::String().New(env, start);
            } else {
                return Napi::String().New(env, "null");
            }
        }
        case 81: {
            std::string start = "";
            for(auto i = 0; i < structure.size(); i++) {
                if(structure[i][width] == figure) {
                    start.push_back( static_cast<char>(width + 97) );
                    start.push_back( static_cast<char>(i + 49) );
                    start.push_back(move[0]);
                    start.push_back(move[1]);
                    update(start);
                    return Napi::String().New(env, start);
                }
            }
            for(auto i = 0; i < structure[height].length(); i++) {
                if(structure[height][i] == figure) {
                    start.push_back( static_cast<char>(i + 97) );
                    start.push_back( static_cast<char>(height + 49) );
                    start.push_back(move[0]);
                    start.push_back(move[1]);
                    update(start);
                    return Napi::String().New(env, start);
                }
            }
            for(auto i = 0; i < structure.size(); i++) {
                for(auto j = 0; j < structure[i].length(); i++) {
                    if(structure[i][j] == figure) {
                        start.push_back( static_cast<char>(j + 97) );
                        start.push_back( static_cast<char>(i + 49) );
                        start.push_back(move[0]);
                        start.push_back(move[1]);
                        update(start);
                        return Napi::String().New(env, start);
                    }
                }
            }
            for(auto i = 0; i < structure.size(); i++) {
                for(auto j = structure[i].length() - 1; j >= 0; j--) {
                    if(structure[height][i] == figure) {
                        start.push_back( static_cast<char>(j + 97) );
                        start.push_back( static_cast<char>(i + 49) );
                        start.push_back(move[0]);
                        start.push_back(move[1]);
                        update(start);
                        return Napi::String().New(env, start);
                    }
                }
            }
            return Napi::String().New(env, "null");
        }
        case 82: {
            std::string start = "";
            for(auto i = 0; i < structure.size(); i++) {
                if(structure[i][width] == figure) {
                    start.push_back( static_cast<char>(width + 97) );
                    start.push_back( static_cast<char>(i + 49) );
                    start.push_back(move[0]);
                    start.push_back(move[1]);
                    update(start);
                    return Napi::String().New(env, start);
                }
            }
            for(auto i = 0; i < structure[height].length(); i++) {
                if(structure[height][i] == figure) {
                    start.push_back( static_cast<char>(i + 97) );
                    start.push_back( static_cast<char>(height + 49) );
                    start.push_back(move[0]);
                    start.push_back(move[1]);
                    update(start);
                    return Napi::String().New(env, start);
                }
            }
            return Napi::String().New(env, "null");
        }
        default:
            break;
    }
}

Napi::Value Player::deleteFigure(Napi::CallbackInfo &info) {
    auto position = info[0].ToString().Utf8Value();
    auto width = static_cast<int>(position[0]) - 97;
    auto height = static_cast<int>(position[1]) - 49;
    structure[height][width] = ' ';
    return Napi::Value();
}

Napi::Object Player::Init(Napi::Env env, Napi::Object exports) {
    std::vector<Napi::ClassPropertyDescriptor<Player>> methods;
    methods.push_back( InstanceMethod( "getID", reinterpret_cast<InstanceMethodCallback>(&Player::getID)));
    methods.push_back( InstanceMethod( "updateStructure", reinterpret_cast<InstanceMethodCallback>(&Player::updateStructure)));
    methods.push_back( InstanceMethod( "deleteFigure", reinterpret_cast<InstanceMethodCallback>(&Player::deleteFigure)));
    Napi::Function func = DefineClass(env, "Player", methods);
    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();
    exports.Set("Player", func);
    return exports;
}

Napi::Object init(Napi::Env env, Napi::Object exports ) {
    return Player::Init(env, exports);
}

NODE_API_MODULE(Player, init)