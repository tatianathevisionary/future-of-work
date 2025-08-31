# 📝 Commit Message Guide for Semantic Release

**Future of Work Encyclopedia Project**

This guide explains how to write commit messages that will automatically trigger releases and generate comprehensive release notes.

## 🎯 **Commit Message Format**

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

## 🏷️ **Commit Types**

### **Major Version Bump (X.0.0)**
- **`feat!`** - New feature with breaking changes
- **`fix!`** - Bug fix with breaking changes
- **`BREAKING CHANGE:`** in footer - Any breaking change

### **Minor Version Bump (0.X.0)**
- **`feat:`** - New feature (backward compatible)
- **`perf:`** - Performance improvements
- **`refactor:`** - Code refactoring

### **Patch Version Bump (0.0.X)**
- **`fix:`** - Bug fix
- **`docs:`** - Documentation changes
- **`style:`** - Code style changes
- **`test:`** - Test additions/changes
- **`chore:`** - Maintenance tasks

## 📝 **Examples**

### **Feature (Minor Version)**
```
feat: add AI readiness assessment tool

- Interactive assessment with 25 questions
- Automated scoring and recommendations
- Export functionality for team sharing
```

### **Bug Fix (Patch Version)**
```
fix: resolve navigation links in mobile view

- Fix broken internal links on small screens
- Improve mobile navigation experience
- Update responsive design breakpoints
```

### **Documentation (Patch Version)**
```
docs: update quick start guide with new features

- Add AI transformation checklist
- Include workforce skills assessment
- Update screenshots and examples
```

### **Breaking Change (Major Version)**
```
feat!: restructure knowledge domains architecture

BREAKING CHANGE: Domain structure changed from 13 to 6 major areas.
All existing links to old domain structure will need updating.

- Consolidate related topics into focused domains
- Improve cross-referencing between domains
- Streamline navigation and discovery
```

### **Performance Improvement (Minor Version)**
```
perf: optimize markdown rendering performance

- Reduce parsing time by 40%
- Implement lazy loading for large documents
- Cache frequently accessed content
```

## 🔄 **Release Triggers**

| Commit Type | Version Bump | Example |
|-------------|--------------|---------|
| `feat:` | Minor (0.X.0) | 1.0.0 → 1.1.0 |
| `fix:` | Patch (0.0.X) | 1.0.0 → 1.0.1 |
| `docs:` | Patch (0.0.X) | 1.0.0 → 1.0.1 |
| `style:` | Patch (0.0.X) | 1.0.0 → 1.0.1 |
| `refactor:` | Patch (0.0.X) | 1.0.0 → 1.0.1 |
| `perf:` | Minor (0.X.0) | 1.0.0 → 1.1.0 |
| `test:` | Patch (0.0.X) | 1.0.0 → 1.0.1 |
| `chore:` | Patch (0.0.X) | 1.0.0 → 1.0.1 |
| `feat!` | Major (X.0.0) | 1.0.0 → 2.0.0 |
| `BREAKING CHANGE:` | Major (X.0.0) | 1.0.0 → 2.0.0 |

## 🚀 **Automated Release Process**

1. **Commit with proper format** → Semantic release analyzes
2. **Version determined** → Based on commit types
3. **Release notes generated** → From commit messages
4. **GitHub release created** → With changelog and notes
5. **Version tags created** → For tracking releases

## 📋 **Best Practices**

### **Do's**
- ✅ Use clear, descriptive commit messages
- ✅ Include scope when relevant (e.g., `feat(assessment): add new tool`)
- ✅ Write detailed descriptions for complex changes
- ✅ Use imperative mood ("add" not "added")
- ✅ Keep first line under 72 characters

### **Don'ts**
- ❌ Use vague messages like "fix stuff" or "update things"
- ❌ Mix multiple types in one commit
- ❌ Use present tense ("adds" not "add")
- ❌ Forget to include breaking change notes
- ❌ Commit without testing

## 🧪 **Testing Your Commits**

Before pushing, test your commit message format:

```bash
# Test semantic release locally
npm run release:dry-run

# This will show what version would be released
# and what release notes would be generated
```

## 🔗 **Related Documentation**

- **[RELEASING.md](RELEASING.md)** - Complete release process
- **[RELEASE-MANAGEMENT.md](project-documentation/RELEASE-MANAGEMENT.md)** - Release management guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

---

**🎯 Remember:** Good commit messages = Better release notes = Happier users!

---

*This guide ensures semantic release works properly and generates comprehensive, useful release notes automatically.*
