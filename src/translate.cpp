#include <napi.h>

Napi::Value translate(Napi::CallbackInfo &info) {
  auto env = info.Env();
  auto str = info[0].ToString().Utf8Value();
  int i;
  if(str[0] < 90) {
    i = static_cast<int>(str[0]) - 49;
  } else {
    i = static_cast<int>(str[0]) - 97;
  }
  return Napi::Number::New(env, i);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "translate"), Napi::Function::New(env, translate));
  return exports;
}

NODE_API_MODULE(translate, Init);