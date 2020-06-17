#include <napi.h>
#include <vector>

class Player : public Napi::ObjectWrap<Player> {
private:
    static Napi::FunctionReference constructor;
    std::vector<std::string> structure;
    std::string ID;
    std::string update(std::string move);
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    Player(Napi::CallbackInfo &info);
    Napi::Value getID(Napi::CallbackInfo &info);
    Napi::Value updateStructure(Napi::CallbackInfo &info);
    Napi::Value getStructure(Napi::CallbackInfo &info);
    Napi::Value deleteFigure(Napi::CallbackInfo &info);
    ~Player();
};

Napi::FunctionReference Player::constructor;

Player::Player(Napi::CallbackInfo &info) : Napi::ObjectWrap<Player>(info) {
    ID = info[0].ToString().Utf8Value();
    auto color = info[1].ToString().Utf8Value();
    auto game = info[2].ToString().Utf8Value();
    if(game == "chess") {
        if(color == "black") {
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("PPPPPPPP");
            structure.push_back("RNBQKBNR");
        } else if (color == "white") {
            structure.push_back("RNBQKBNR");
            structure.push_back("PPPPPPPP");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
        }
    } else if(game == "checkers") {
        if(color == "black") {
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("p p p p ");
            structure.push_back(" p p p p");
            structure.push_back("p p p p ");
        } else if (color == "white") {
            structure.push_back(" p p p p");
            structure.push_back("p p p p ");
            structure.push_back(" p p p p");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
            structure.push_back("        ");
        }
    }
}

Player::~Player() {}

Napi::Value Player::getID(Napi::CallbackInfo &info) {
    return Napi::String().New(info.Env(), ID);
}

std::string Player::update(std::string move) {
    auto start = move.substr(0, 2);
    auto end = move.substr(2, 4);
    auto startWidth = static_cast<int>(start[0]) - 97;
    auto startHeight = static_cast<int>(start[1]) - 49;
    auto endWidth = static_cast<int>(end[0]) - 97;
    auto endHeight = static_cast<int>(end[1]) - 49;
    structure[endHeight][endWidth] = structure[startHeight][startWidth];
    structure[startHeight][startWidth] = ' ';
    return move;
}

Napi::Value Player::updateStructure(Napi::CallbackInfo &info) {
    auto env = info.Env();
    auto move = info[0].ToString().Utf8Value();
    auto tab = Napi::Array::New(env, structure.size());
    update(move);
    for(auto i = 0; i < structure.size(); i++) {
        tab[i] = Napi::String::New(env, structure[i]);
    }
    return tab;
}

Napi::Value Player::getStructure(Napi::CallbackInfo &info) {
    auto env = info.Env();
    auto tab = Napi::Array::New(env, structure.size());
    for(auto i = 0; i < structure.size(); i++) {
        tab[i] = Napi::String::New(env, structure[i]);
    }
    return tab;
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
    methods.push_back( InstanceMethod( "getStructure", reinterpret_cast<InstanceMethodCallback>(&Player::getStructure)));
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