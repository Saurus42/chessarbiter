#include <napi.h>
#include <vector>

class Pawns : public Napi::ObjectWrap<Pawns>
{
private:
    /* data */
    static Napi::FunctionReference constructor;
    std::vector<std::string> structure;
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports); 
    Napi::Value GetStructure(Napi::CallbackInfo &info);
    Napi::Value UpdateStructure(Napi::CallbackInfo &info);
    Pawns(Napi::CallbackInfo &info);
    ~Pawns();
};

Napi::FunctionReference Pawns::constructor;

Napi::Object Pawns::Init(Napi::Env env, Napi::Object exports) {
    std::vector<Napi::ClassPropertyDescriptor<Pawns>> methods;
    methods.push_back( InstanceMethod( "getStructure", reinterpret_cast<InstanceMethodCallback>(&Pawns::GetStructure)));
    methods.push_back( InstanceMethod( "updateStructure", reinterpret_cast<InstanceMethodCallback>(&Pawns::UpdateStructure)));
    Napi::Function func = DefineClass(env, "Pawns", methods);
    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();
    exports.Set("Pawns", func);
    return exports;
}

Pawns::Pawns(Napi::CallbackInfo &info) : Napi::ObjectWrap<Pawns>(info) {
    auto env = info.Env();
    auto value = info[0].ToString().Utf8Value();
    if( value == "chess" ) {
        structure.push_back("RBNKQNBR");
        structure.push_back("pppppppp");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back("pppppppp");
        structure.push_back("RBNKQNBR");
    } else {
        structure.push_back("p p p p ");
        structure.push_back(" p p p p");
        structure.push_back("p p p p ");
        structure.push_back("        ");
        structure.push_back("        ");
        structure.push_back(" p p p p");
        structure.push_back("p p p p ");
        structure.push_back(" p p p p");
    }
}

Pawns::~Pawns()
{
}

Napi::Value Pawns::GetStructure(Napi::CallbackInfo &info) {
    auto env = info.Env();
    auto array = Napi::Array::New(env, structure.size());
    for(auto i = 0; i < array.Length(); i++) {
        array[i] = Napi::String::New(env, structure[i]);
    }
    return array;
}

Napi::Value Pawns::UpdateStructure(Napi::CallbackInfo &info) {
    auto env = info.Env();
    auto move = info[0].ToString().Utf8Value();
    auto start = move.substr(0, 2);
    auto end = move.substr(2, 4);
    auto startWidth = static_cast<int>(start[0]) - 97;
    auto startHeight = static_cast<int>(start[1]) - 49;
    auto endWidth = static_cast<int>(end[0]) - 97;
    auto endHeight = static_cast<int>(end[1]) - 49;
    structure[endHeight][endWidth] = structure[startHeight][startWidth];
    structure[startHeight][startWidth] = ' ';
    return Napi::Value();
}

Napi::Object init(Napi::Env env, Napi::Object exports ) {
    return Pawns::Init(env, exports);
}

NODE_API_MODULE(Pawns, init)
