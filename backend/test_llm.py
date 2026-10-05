import os
from dotenv import load_dotenv

load_dotenv()

# ─────────────────────────────────────────────────────────────
# Free models to test on OpenRouter
# ─────────────────────────────────────────────────────────────
OPENROUTER_FREE_MODELS = [
    "meta-llama/llama-3.2-3b-instruct:free",
    "google/gemma-3-4b-it:free",
    "mistralai/mistral-small-3.1-24b-instruct:free",
    "deepseek/deepseek-r1:free",
]

GEMINI_MODELS = [
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
]


# ─────────────────────────────────────────────────────────────
# Key Checker
# ─────────────────────────────────────────────────────────────
def check_env_keys() -> bool:
    print("🔑 Checking API keys in .env...\n")
    keys = {
        "GROQ_API_KEY":       os.getenv("GROQ_API_KEY"),
        "GOOGLE_API_KEY":     os.getenv("GOOGLE_API_KEY"),
        "OPENROUTER_API_KEY": os.getenv("OPENROUTER_API_KEY"),
    }
    all_good = True
    for name, value in keys.items():
        if value:
            print(f"  ✅ {name} found — ends with: ...{value[-6:]}")
        else:
            print(f"  ❌ {name} is MISSING from .env")
            all_good = False
    return all_good


# ─────────────────────────────────────────────────────────────
# Test Groq
# ─────────────────────────────────────────────────────────────
def test_groq():
    print("\n" + "─" * 50)
    print("🔵 Testing Groq (llama-3.1-8b-instant)...")
    print("─" * 50)
    try:
        from langchain_groq import ChatGroq
        llm = ChatGroq(
            model="llama-3.1-8b-instant",
            groq_api_key=os.getenv("GROQ_API_KEY"),
            max_tokens=50,
        )
        response = llm.invoke("Say hello in one sentence.")
        print(f"  ✅ Groq works!")
        print(f"  💬 Response: {response.content}")
        return True
    except Exception as e:
        print(f"  ❌ Groq failed: {e}")
        return False


# ─────────────────────────────────────────────────────────────
# Test Gemini (tries multiple models)
# ─────────────────────────────────────────────────────────────
def test_gemini():
    print("\n" + "─" * 50)
    print("🟡 Testing Gemini (trying multiple models)...")
    print("─" * 50)

    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("  ⏭️  Skipping — GOOGLE_API_KEY not set.")
        return None, None

    try:
        from langchain_google_genai import ChatGoogleGenerativeAI
    except ImportError:
        print("  ❌ langchain-google-genai not installed.")
        print("  👉 Run: pip install langchain-google-genai")
        return None, None

    for model in GEMINI_MODELS:
        print(f"\n  🔄 Trying model: {model}")
        try:
            llm = ChatGoogleGenerativeAI(
                model=model,
                google_api_key=api_key,
                max_output_tokens=50,
            )
            response = llm.invoke("Say hello in one sentence.")
            print(f"  ✅ {model} works!")
            print(f"  💬 Response: {response.content}")
            return True, model
        except Exception as e:
            err = str(e)
            if "limit: 0" in err or "RESOURCE_EXHAUSTED" in err:
                print(f"  ⚠️  {model} — Quota/region blocked (limit: 0)")
            elif "404" in err or "not found" in err.lower():
                print(f"  ⚠️  {model} — Model not found")
            else:
                print(f"  ❌ {model} — Error: {err[:120]}")

    print("\n  ❌ All Gemini models failed.")
    print("  💡 Gemini free tier may not be available in your region (Bangladesh).")
    print("  💡 You can skip Gemini and rely on Groq + OpenRouter only.")
    return False, None


# ─────────────────────────────────────────────────────────────
# Test OpenRouter (tries multiple free models)
# ─────────────────────────────────────────────────────────────
def test_openrouter():
    print("\n" + "─" * 50)
    print("🟣 Testing OpenRouter (trying free models)...")
    print("─" * 50)

    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        print("  ⏭️  Skipping — OPENROUTER_API_KEY not set.")
        return None, None

    try:
        from langchain_openai import ChatOpenAI
    except ImportError:
        print("  ❌ langchain-openai not installed.")
        print("  👉 Run: pip install langchain-openai")
        return None, None

    for model in OPENROUTER_FREE_MODELS:
        print(f"\n  🔄 Trying model: {model}")
        try:
            llm = ChatOpenAI(
                base_url="https://openrouter.ai/api/v1",
                api_key=api_key,
                model=model,
                max_tokens=50,
            )
            response = llm.invoke("Say hello in one sentence.")
            print(f"  ✅ {model} works!")
            print(f"  💬 Response: {response.content}")
            return True, model
        except Exception as e:
            err = str(e)
            if "404" in err or "No endpoints" in err:
                print(f"  ⚠️  {model} — Not available / removed")
            elif "429" in err:
                print(f"  ⚠️  {model} — Rate limited, try later")
            else:
                print(f"  ❌ {model} — Error: {err[:120]}")

    print("\n  ❌ All OpenRouter free models failed.")
    print("  💡 Check available free models at: https://openrouter.ai/models?q=free")
    return False, None


# ─────────────────────────────────────────────────────────────
# Summary
# ─────────────────────────────────────────────────────────────
def print_summary(groq_ok, gemini_result, openrouter_result):
    gemini_ok, gemini_model     = gemini_result
    openrouter_ok, openrouter_model = openrouter_result

    print("\n" + "=" * 50)
    print("                  SUMMARY")
    print("=" * 50)

    print(f"  Groq:        {'✅ Ready' if groq_ok else '❌ Failed'}")
    if gemini_ok:
        print(f"  Gemini:      ✅ Ready  →  use model: '{gemini_model}'")
    elif gemini_ok is False:
        print(f"  Gemini:      ❌ Failed (skip — not available in your region)")
    else:
        print(f"  Gemini:      ⏭️  Skipped (no API key)")

    if openrouter_ok:
        print(f"  OpenRouter:  ✅ Ready  →  use model: '{openrouter_model}'")
    elif openrouter_ok is False:
        print(f"  OpenRouter:  ❌ Failed (check https://openrouter.ai/models?q=free)")
    else:
        print(f"  OpenRouter:  ⏭️  Skipped (no API key)")

    print("\n📋 Recommended main.py config based on results:")
    print("─" * 50)

    if groq_ok:
        print("  PRIMARY   → Groq ✅")
    if gemini_ok:
        print(f"  FALLBACK  → Gemini ✅  model='{gemini_model}'")
    if openrouter_ok:
        label = "FALLBACK" if not gemini_ok else "TERTIARY"
        print(f"  {label} → OpenRouter ✅  model='{openrouter_model}'")
    if not groq_ok and not gemini_ok and not openrouter_ok:
        print("  ⚠️  No providers working! Check your API keys.")

    print("=" * 50)


# ─────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 50)
    print("      MoonBot LLM Connection Tester v2")
    print("=" * 50)

    keys_ok = check_env_keys()

    if not keys_ok:
        print("\n⚠️  Add missing API keys to .env and rerun.")
    else:
        groq_ok        = test_groq()
        gemini_result  = test_gemini()
        openrouter_result = test_openrouter()
        print_summary(groq_ok, gemini_result, openrouter_result)